import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type JwtUser = {
  userId: string
  phone: string
}

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): JwtUser => {
  const request = ctx.switchToHttp().getRequest()
  return request.user as JwtUser
})
