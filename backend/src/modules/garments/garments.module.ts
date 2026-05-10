import { Module } from '@nestjs/common'
import { PrismaService } from '../../config/prisma.service'
import { GarmentsController } from './garments.controller'
import { GarmentsService } from './garments.service'

@Module({
  controllers: [GarmentsController],
  providers: [GarmentsService, PrismaService],
  exports: [GarmentsService],
})
export class GarmentsModule {}
