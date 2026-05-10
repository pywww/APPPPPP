import { Module } from '@nestjs/common'
import { PrismaService } from '../../config/prisma.service'
import { LooksController } from './looks.controller'
import { LooksService } from './looks.service'

@Module({
  controllers: [LooksController],
  providers: [LooksService, PrismaService],

  exports: [LooksService],

})

export class LooksModule {}


