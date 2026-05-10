import { Controller, Get, Param, ParseIntPipe, Post, Query, Body, UseGuards, Delete, Patch } from '@nestjs/common'
import { CurrentUser, JwtUser } from '../../common/decorators/current-user.decorator'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CreateGarmentDto, UpdateGarmentDto } from './dto'
import { GarmentsService } from './garments.service'

@UseGuards(JwtAuthGuard)
@Controller('garments')
export class GarmentsController {
  constructor(private readonly garmentsService: GarmentsService) {}

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateGarmentDto) {
    return this.garmentsService.create(user.userId, dto)
  }

  @Get()
  list(@CurrentUser() user: JwtUser, @Query('category') category?: string) {
    return this.garmentsService.list(user.userId, category)
  }

  @Get(':id')
  detail(@CurrentUser() user: JwtUser, @Param('id', ParseIntPipe) id: number) {
    return this.garmentsService.detail(user.userId, id)
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGarmentDto,
  ) {
    return this.garmentsService.update(user.userId, id, dto)
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtUser, @Param('id', ParseIntPipe) id: number) {
    return this.garmentsService.remove(user.userId, id)
  }
}
