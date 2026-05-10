import { BadRequestException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { resolveImageUrlForDashScopeModel } from '../dashscope-oss-upload'
import { ProviderSubmitInput, ProviderSubmitResult, TryOnProvider } from './tryon-provider.interface'

/** 阿里云「AI 试衣-基础版」异步合成 */
const AITRYON_MODEL = 'aitryon'
const SYNTHESIS_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image2image/image-synthesis'
const TASKS_URL = 'https://dashscope.aliyuncs.com/api/v1/tasks'

const POLL_INTERVAL_MS = 3500
const POLL_MAX_ATTEMPTS = 100

@Injectable()
export class AliyunAitryonTryOnProviderService implements TryOnProvider {
  readonly name = 'aliyun-aitryon'
  private readonly logger = new Logger(AliyunAitryonTryOnProviderService.name)

  constructor(private readonly config: ConfigService) {}

  private get apiKey(): string | undefined {
    return this.config.get<string>('DASHSCOPE_API_KEY')
  }

  async submitAndWait(input: ProviderSubmitInput): Promise<ProviderSubmitResult> {
    const key = this.apiKey
    if (!key) {
      throw new ServiceUnavailableException('未配置 DASHSCOPE_API_KEY，无法调用 AI 试衣')
    }
    const modelUrl = input.modelImageUrl?.trim()
    if (!modelUrl) {
      throw new BadRequestException('AI 试衣基础版需要模特全身正面图（person_image_url），请传入 modelImageUrl')
    }

    const person = await resolveImageUrlForDashScopeModel({
      apiKey: key,
      model: AITRYON_MODEL,
      imageUrl: modelUrl,
    })
    const garment = await resolveImageUrlForDashScopeModel({
      apiKey: key,
      model: AITRYON_MODEL,
      imageUrl: input.garmentImageUrl,
    })

    const useOssHeader = person.useOssResolveHeader || garment.useOssResolveHeader
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
      'X-DashScope-Async': 'enable',
    }
    if (useOssHeader) {
      headers['X-DashScope-OssResourceResolve'] = 'enable'
    }

    const body = {
      model: AITRYON_MODEL,
      input: {
        person_image_url: person.imageUrl,
        top_garment_url: garment.imageUrl,
      },
      parameters: {
        resolution: -1,
        restore_face: true,
      },
    }

    const createRes = await fetch(SYNTHESIS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const createJson = (await createRes.json()) as Record<string, unknown>
    if (!createRes.ok) {
      const msg =
        typeof createJson.message === 'string'
          ? createJson.message
          : typeof createJson.code === 'string'
            ? createJson.code
            : `创建试衣任务失败 HTTP ${createRes.status}`
      throw new BadRequestException(msg)
    }

    if (typeof createJson.code === 'string' && createJson.code && !createJson.output) {
      const msg = typeof createJson.message === 'string' ? createJson.message : createJson.code
      throw new BadRequestException(msg)
    }

    const taskId = extractCreateTaskId(createJson)
    if (!taskId) {
      this.logger.warn(`创建试衣任务响应无 task_id: ${JSON.stringify(createJson).slice(0, 500)}`)
      throw new BadRequestException('DashScope 响应缺少 task_id')
    }

    const resultImageUrl = await this.pollTaskUntilDone(key, taskId)
    return {
      providerTaskId: taskId,
      resultImageUrl,
    }
  }

  private async pollTaskUntilDone(apiKey: string, taskId: string): Promise<string> {
    const url = `${TASKS_URL}/${encodeURIComponent(taskId)}`
    for (let i = 0; i < POLL_MAX_ATTEMPTS; i += 1) {
      if (i > 0) {
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
      }
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      const json = (await res.json()) as Record<string, unknown>
      if (!res.ok) {
        const msg = typeof json.message === 'string' ? json.message : `查询任务失败 HTTP ${res.status}`
        throw new BadRequestException(msg)
      }

      const parsed = parseTaskOutput(json)
      const st = parsed.taskStatus
      if (st === 'SUCCEEDED' || st === 'SUCCESS') {
        if (parsed.imageUrl) return parsed.imageUrl
        this.logger.warn(`试衣成功但未解析到图片 URL，原始片段: ${JSON.stringify(json).slice(0, 1200)}`)
        throw new BadRequestException('试衣成功但未返回图片地址，请查看后端日志中的 DashScope 原始响应')
      }
      if (st === 'FAILED') {
        throw new BadRequestException(parsed.message || '试衣任务失败')
      }
      // PENDING / RUNNING 等继续轮询
    }
    throw new BadRequestException('试衣任务超时，请稍后重试')
  }
}

function extractCreateTaskId(json: Record<string, unknown>): string | undefined {
  const output = json.output as Record<string, unknown> | undefined
  if (typeof output?.task_id === 'string' && output.task_id) {
    return output.task_id
  }
  const nested = json.data as { output?: { task_id?: string } } | undefined
  if (typeof nested?.output?.task_id === 'string' && nested.output.task_id) {
    return nested.output.task_id
  }
  return undefined
}

function parseTaskOutput(json: Record<string, unknown>): {
  taskStatus: string
  imageUrl?: string
  message?: string
} {
  const output = (json.output ?? (json.data as Record<string, unknown> | undefined)?.output) as
    | Record<string, unknown>
    | undefined
  if (!output) {
    return { taskStatus: 'UNKNOWN', message: '响应缺少 output' }
  }
  const taskStatus = String(
    output.task_status ?? output.taskStatus ?? output.status ?? '',
  ).toUpperCase()

  let imageUrl: string | undefined
  if (typeof output.image_url === 'string' && output.image_url) {
    imageUrl = output.image_url
  } else if (Array.isArray(output.render_urls) && typeof output.render_urls[0] === 'string') {
    imageUrl = output.render_urls[0]
  } else if (Array.isArray(output.results)) {
    const first = output.results[0] as { url?: string } | undefined
    if (first && typeof first.url === 'string') imageUrl = first.url
  }

  const message =
    typeof output.message === 'string'
      ? output.message
      : typeof output.code === 'string'
        ? output.code
        : undefined

  // 部分任务在失败时把说明放在 result / error 内
  if (!imageUrl && output.result && typeof output.result === 'object') {
    const r = output.result as Record<string, unknown>
    if (typeof r.image_url === 'string' && r.image_url) {
      imageUrl = r.image_url
    }
  }

  return { taskStatus, imageUrl, message }
}
