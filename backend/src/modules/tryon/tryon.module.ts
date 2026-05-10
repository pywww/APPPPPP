import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../config/prisma.service'
import { AliyunAitryonTryOnProviderService } from './providers/aliyun-aitryon-tryon.provider'
import { ThirdPartyTryOnProviderService } from './providers/provider-thirdparty-a.service'
import { TryOnController } from './tryon.controller'
import { TryOnService } from './tryon.service'

@Module({
  controllers: [TryOnController],
  providers: [
    TryOnService,
    {
      provide: ThirdPartyTryOnProviderService,
      useFactory: (config: ConfigService) => {
        const mode = config.get<string>('TRYON_PROVIDER')?.trim().toLowerCase() ?? 'aliyun'
        if (mode === 'mock') {
          return new ThirdPartyTryOnProviderService()
        }
        return new AliyunAitryonTryOnProviderService(config)
      },
      inject: [ConfigService],
    },
    PrismaService,
  ],
  exports: [TryOnService],
})
export class TryOnModule {}
