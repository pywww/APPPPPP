import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateGarmentDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  category!: string

  @IsString()
  color!: string

  @IsString()
  @IsNotEmpty()
  originalDataUrl!: string

  @IsOptional()
  @IsString()
  resultDataUrl?: string
}

/** 局部更新衣物：至少提供 name / category / color 中一项 */
export class UpdateGarmentDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  color?: string
}
