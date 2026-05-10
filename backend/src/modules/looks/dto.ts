import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLookDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  imageUrl!: string
}

export class UpdateLookDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  imageUrl?: string
}
