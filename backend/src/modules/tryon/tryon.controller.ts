import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { CurrentUser, JwtUser } from '../../common/decorators/current-user.decorator'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CreateTryOnTaskDto } from './dto'
import { TryOnService } from './tryon.service'

@UseGuards(JwtAuthGuard)
@Controller('tryon/tasks')
export class TryOnController {
  constructor(private readonly tryOnService: TryOnService) {}

  @Post()
  createTask(@CurrentUser() user: JwtUser, @Body() dto: CreateTryOnTaskDto) {
    return this.tryOnService.createTask(user.userId, dto)
  }

  @Get(':id')
  getTask(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.tryOnService.getTask(user.userId, id)
  }
}
