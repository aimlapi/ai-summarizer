import { IsInt, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCompletionDTO {
  @IsString()
  model: string;

  @IsString()
  prompt: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsInt()
  max_tokens: number;

  @IsOptional()
  @IsNumber()
  frequency_penalty: number;

  @IsOptional()
  @IsNumber()
  top_p: number;

  @IsOptional()
  @IsNumber()
  temperature: number;
}
