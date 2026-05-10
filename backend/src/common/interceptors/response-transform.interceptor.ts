import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { Request } from 'express'

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>()
    return next.handle().pipe(
      map((data) => ({
        code: 0,
        message: 'ok',
        data,
        requestId: request.headers['x-request-id'] ?? null,
      })),
    )
  }
}
