import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TryOnTaskStatus } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PrismaService } from '../../config/prisma.service'
import { CreateTryOnTaskDto } from './dto'
import { ThirdPartyTryOnProviderService } from './providers/provider-thirdparty-a.service'

/** Nest HttpException 的 message 常为 “Bad Request”，应从 getResponse() 取业务文案 */
function extractExceptionMessage(error: unknown): string {
  if (error instanceof HttpException) {
    const res = error.getResponse()
    if (typeof res === 'string') return res
    if (res && typeof res === 'object' && 'message' in res) {
      const m = (res as { message: string | string[] }).message
      if (Array.isArray(m)) return m.filter(Boolean).join('；')
      if (typeof m === 'string' && m.trim()) return m
    }
  }
  if (error instanceof Error) return error.message
  return '试穿失败'
}

@Injectable()
export class TryOnService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly provider: ThirdPartyTryOnProviderService,
    private readonly config: ConfigService,
  ) {}

  async createTask(userId: string, dto: CreateTryOnTaskDto) {
    const mode = this.config.get<string>('TRYON_PROVIDER')?.trim().toLowerCase() ?? 'aliyun'
    if (mode !== 'mock' && (!dto.modelImageUrl || !dto.modelImageUrl.trim())) {
      throw new BadRequestException(
        '云端 AI 试衣需要 modelImageUrl（模特全身正面图）。请在前端完成模特设置后再试，或将环境变量 TRYON_PROVIDER=mock 使用本地演示。',
      )
    }

    const idempotencyKey = dto.idempotencyKey ?? randomUUID()
    const existing = await this.prisma.tryOnTask.findUnique({ where: { idempotencyKey } })
    if (existing && existing.userId === userId) return existing

    const task = await this.prisma.tryOnTask.create({
      data: {
        userId,
        status: TryOnTaskStatus.pending,
        provider: this.provider.name,
        garmentImageUrl: dto.garmentImageUrl,
        modelImageUrl: dto.modelImageUrl,
        idempotencyKey,
      },
    })

    void this.processTask(task.id)
    return task
  }

  async getTask(userId: string, taskId: string) {
    const task = await this.prisma.tryOnTask.findFirst({ where: { id: taskId, userId } })
    if (!task) throw new NotFoundException('试穿任务不存在')
    return task
  }

  private async processTask(taskId: string) {
    await this.prisma.tryOnTask.update({
      where: { id: taskId },
      data: {
        status: TryOnTaskStatus.running,
      },
    })
    try {
      const task = await this.prisma.tryOnTask.findUniqueOrThrow({ where: { id: taskId } })
      const result = await this.provider.submitAndWait({
        garmentImageUrl: task.garmentImageUrl,
        modelImageUrl: task.modelImageUrl ?? undefined,
      })
      await this.prisma.tryOnTask.update({
        where: { id: taskId },
        data: {
          status: TryOnTaskStatus.success,
          providerTaskId: result.providerTaskId,
          resultImageUrl: result.resultImageUrl,
          finishedAt: new Date(),
        },
      })
    } catch (error) {
      await this.prisma.tryOnTask.update({
        where: { id: taskId },
        data: {
          status: TryOnTaskStatus.failed,
          failReason: extractExceptionMessage(error),
          finishedAt: new Date(),
        },
      })
    }
  }
}
