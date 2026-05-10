import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { CurrentUser, JwtUser } from '../../common/decorators/current-user.decorator'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CreateLookDto, UpdateLookDto } from './dto'
import { LooksService } from './looks.service'

@UseGuards(JwtAuthGuard)
@Controller('looks')
export class LooksController {
  constructor(private readonly looksService: LooksService) {}

  @Get()
  list(@CurrentUser() user: JwtUser) {
    return this.looksService.list(user.userId)
  }

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateLookDto) {
    return this.looksService.create(user.userId, dto)
  }

  @Get(':id')
  detail(@CurrentUser() user: JwtUser, @Param('id', ParseIntPipe) id: number) {
    return this.looksService.detail(user.userId, id)
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLookDto,
  ) {
    return this.looksService.update(user.userId, id, dto)
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtUser, @Param('id', ParseIntPipe) id: number) {
    return this.looksService.remove(user.userId, id)
  }
}
