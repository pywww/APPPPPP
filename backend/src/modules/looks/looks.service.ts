import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../config/prisma.service'
import { CreateLookDto, UpdateLookDto } from './dto'

@Injectable()
export class LooksService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.look.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  create(userId: string, dto: CreateLookDto) {
    return this.prisma.look.create({
      data: {
        userId,
        name: dto.name,
        imageUrl: dto.imageUrl,
      },
    })
  }

  async detail(userId: string, id: number) {
    const row = await this.prisma.look.findFirst({ where: { userId, id } })
    if (!row) throw new NotFoundException('穿搭记录不存在')
    return row
  }

  async update(userId: string, id: number, dto: UpdateLookDto) {
    await this.detail(userId, id)
    if (dto.name === undefined && dto.imageUrl === undefined) {
      throw new BadRequestException('请至少提供 name、imageUrl 之一')
    }
    return this.prisma.look.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.imageUrl !== undefined ? { imageUrl: dto.imageUrl } : {}),
      },
    })
  }

  async remove(userId: string, id: number) {
    await this.detail(userId, id)
    await this.prisma.look.delete({ where: { id } })
    return { success: true }
  }
}
