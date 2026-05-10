import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../config/prisma.service'
import { CreateGarmentDto, UpdateGarmentDto } from './dto'

@Injectable()
export class GarmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateGarmentDto) {
    return this.prisma.garment.create({
      data: {
        userId,
        name: dto.name,
        category: dto.category,
        color: dto.color,
        originalDataUrl: dto.originalDataUrl,
        resultDataUrl: dto.resultDataUrl,
      },
    })
  }

  list(userId: string, category?: string) {
    return this.prisma.garment.findMany({
      where: {
        userId,
        category: category && category !== '全部' ? category : undefined,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async detail(userId: string, id: number) {
    const row = await this.prisma.garment.findFirst({
      where: { userId, id },
    })
    if (!row) throw new NotFoundException('衣物不存在')
    return row
  }

  async update(userId: string, id: number, dto: UpdateGarmentDto) {
    await this.detail(userId, id)
    const { name, category, color } = dto
    if (name === undefined && category === undefined && color === undefined) {
      throw new BadRequestException('请至少提供 name、category、color 之一')
    }
    return this.prisma.garment.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(color !== undefined ? { color } : {}),
      },
    })
  }

  async remove(userId: string, id: number) {
    await this.detail(userId, id)
    await this.prisma.garment.delete({ where: { id } })
    return { success: true }
  }
}
