import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from './modules/auth/auth.module'
import { GarmentsModule } from './modules/garments/garments.module'
import { LooksModule } from './modules/looks/looks.module'
import { TryOnModule } from './modules/tryon/tryon.module'
import { UploadsModule } from './modules/uploads/uploads.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './config/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => [
        {
          ttl: 60_000,
          limit: 60,
        },
      ],
    }),
    AuthModule,
    UploadsModule,
    TryOnModule,
    GarmentsModule,
    LooksModule,
    UsersModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
