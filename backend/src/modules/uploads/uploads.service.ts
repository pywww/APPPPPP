import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../config/prisma.service'
import { PresignUploadDto } from './dto'

@Injectable()
export class UploadsService {
  constructor(private readonly prisma: PrismaService) {}

  async presign(userId: string, dto: PresignUploadDto) {
    // 当前阶段给前端返回可直接使用的 mock 上传结果，后续替换成 OSS/COS/S3 签名逻辑。
    const key = `${userId}/${Date.now()}-${dto.fileName}`
    const publicUrl = `https://mock-storage.local/${key}`
    await this.prisma.uploadAsset.create({
      data: {
        userId,
        key,
        fileName: dto.fileName,
        mimeType: dto.mimeType,
        size: dto.size,
        publicUrl,
      },
    })

    return {
      uploadUrl: publicUrl,
      publicUrl,
      method: 'PUT',
      headers: {},
      expiresIn: 900,
    }
  }
}
