import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateImageDTO {
  @IsString()
  prompt: string;

  @IsOptional()
  @IsInt()
  n: number;

  @IsOptional()
  @IsInt()
  steps: number;

  @IsOptional()
  @IsString()
  size: string;

  @IsString()
  model: string;
}
