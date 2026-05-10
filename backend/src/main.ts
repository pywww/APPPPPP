import 'reflect-metadata'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const port = config.get<number>('PORT', 3001)
  const frontendOriginRaw = config.get<string>('FRONTEND_ORIGIN', 'http://localhost:5174')
  const configuredOrigins = frontendOriginRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  app.use(helmet())
  // 前端当前用 dataURL 直传，需放宽 body 限制，避免 413 导致试穿失败。
  app.use(json({ limit: '20mb' }))
  app.use(urlencoded({ limit: '20mb', extended: true }))
  app.enableCors({
    /**
     * 兼容本机 + 局域网联调：
     * - 支持 .env 配置的白名单（可逗号分隔）
     * - 开放 localhost/127.0.0.1 与 192.168.x.x/10.x.x.x 等私有网段
     */
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // 无 Origin（例如 curl/服务端请求）直接放行
      if (!origin) return callback(null, true)
      if (configuredOrigins.includes(origin)) return callback(null, true)
      if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return callback(null, true)
      if (/^https?:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/i.test(origin)) {
        return callback(null, true)
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`), false)
    },
    credentials: true,
  })
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseTransformInterceptor())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Try-On Backend API')
    .setDescription('试穿后端服务文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`Backend server running at http://localhost:${port}`)
}

bootstrap()
