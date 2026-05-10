import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class PresignUploadDto {
  @IsString()
  @IsNotEmpty()
  fileName!: string

  @IsString()
  @IsNotEmpty()
  mimeType!: string

  @IsInt()
  @Min(1)
  @Max(20 * 1024 * 1024)
  size!: number
}
