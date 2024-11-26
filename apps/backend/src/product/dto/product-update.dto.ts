import { IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  codeBar: string;
}
