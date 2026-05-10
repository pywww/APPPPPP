import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser, JwtUser } from '../../common/decorators/current-user.decorator'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { PresignUploadDto } from './dto'
import { UploadsService } from './uploads.service'

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presign')
  presign(@CurrentUser() user: JwtUser, @Body() dto: PresignUploadDto) {
    return this.uploadsService.presign(user.userId, dto)
  }
}
