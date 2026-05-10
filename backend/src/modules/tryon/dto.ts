import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTryOnTaskDto {
  @IsString()
  @IsNotEmpty()
  garmentImageUrl!: string

  @IsOptional()
  @IsString()
  modelImageUrl?: string

  @IsOptional()
  @IsString()
  idempotencyKey?: string
}
