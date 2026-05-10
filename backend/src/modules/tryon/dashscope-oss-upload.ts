import { BadRequestException, ServiceUnavailableException } from '@nestjs/common'
import { parseDataUrl, isPublicHttpUrl } from './dashscope-upload'

const DASHSCOPE_UPLOADS_URL = 'https://dashscope.aliyuncs.com/api/v1/uploads'
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

type UploadPolicyData = {
  oss_access_key_id: string
  policy: string
  signature: string
  upload_dir: string
  upload_host: string
  x_oss_object_acl: string
  x_oss_forbid_overwrite: string
}

/**
 * 百炼临时存储：先取凭证再 POST 到 OSS，返回 oss:// 前缀 URL。
 * model 须与后续调用的模型名一致（如 aitryon）。
 */
export async function uploadBufferToDashScope(params: {
  apiKey: string
  model: string
  buffer: Buffer
  fileName: string
  mimeType: string
}): Promise<string> {
  const { apiKey, model, buffer, fileName, mimeType } = params
  if (!apiKey) throw new ServiceUnavailableException('未配置 DASHSCOPE_API_KEY')

  const policyUrl = new URL(DASHSCOPE_UPLOADS_URL)
  policyUrl.searchParams.set('action', 'getPolicy')
  policyUrl.searchParams.set('model', model)

  const policyRes = await fetch(policyUrl.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  const policyJson = (await policyRes.json()) as { data?: UploadPolicyData; message?: string; code?: string }
  if (!policyRes.ok || !policyJson.data) {
    const msg = policyJson.message ?? policyJson.code ?? `获取上传凭证失败 HTTP ${policyRes.status}`
    throw new BadRequestException(msg)
  }

  const d = policyJson.data
  const objectKey = `${d.upload_dir}/${fileName}`

  const form = new FormData()
  form.append('OSSAccessKeyId', d.oss_access_key_id)
  form.append('Signature', d.signature)
  form.append('policy', d.policy)
  form.append('x-oss-object-acl', d.x_oss_object_acl)
  form.append('x-oss-forbid-overwrite', d.x_oss_forbid_overwrite)
  form.append('key', objectKey)
  form.append('success_action_status', '200')
  form.append('file', new Blob([new Uint8Array(buffer)], { type: mimeType }), fileName)

  const uploadRes = await fetch(d.upload_host, {
    method: 'POST',
    body: form,
  })

  if (!uploadRes.ok) {
    const text = await uploadRes.text().catch(() => '')
    throw new BadRequestException(`上传临时文件失败 HTTP ${uploadRes.status} ${text.slice(0, 200)}`)
  }

  return `oss://${objectKey}`
}

/**
 * 将 data URL 或公网 URL 转为 DashScope 可识别的 image_url（https 或 oss://）。
 */
export async function resolveImageUrlForDashScopeModel(params: {
  apiKey: string
  model: string
  imageUrl: string
  /** 上传临时文件时的文件名；不传则使用解析出的后缀名 */
  uploadFileName?: string
}): Promise<{ imageUrl: string; useOssResolveHeader: boolean }> {
  const trimmed = params.imageUrl.trim()
  if (isPublicHttpUrl(trimmed)) {
    return { imageUrl: trimmed, useOssResolveHeader: false }
  }
  const parsed = parseDataUrl(trimmed)
  if (!parsed) {
    throw new BadRequestException('imageUrl 须为公网 http(s) 链接或 data:image/*;base64,...')
  }
  if (parsed.buffer.length < 5 * 1024 || parsed.buffer.length > MAX_IMAGE_BYTES) {
    throw new BadRequestException('图片大小需在 5KB～5MB 之间')
  }
  const ossUrl = await uploadBufferToDashScope({
    apiKey: params.apiKey,
    model: params.model,
    buffer: parsed.buffer,
    fileName: params.uploadFileName ?? parsed.fileName,
    mimeType: parsed.mime,
  })
  return { imageUrl: ossUrl, useOssResolveHeader: true }
}
