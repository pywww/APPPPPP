import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const errResp =
      exception instanceof HttpException
        ? (exception.getResponse() as string | { message?: string | string[] })
        : 'Internal server error'
    const message = typeof errResp === 'string' ? errResp : errResp.message ?? 'Request failed'

    response.status(status).json({
      code: status,
      message: Array.isArray(message) ? message.join(', ') : message,
      data: null,
      requestId: request.headers['x-request-id'] ?? null,
      timestamp: new Date().toISOString(),
    })
  }
}
