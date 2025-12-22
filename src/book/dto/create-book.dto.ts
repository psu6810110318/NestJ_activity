import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}