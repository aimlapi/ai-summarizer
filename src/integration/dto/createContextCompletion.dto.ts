import { IsString } from 'class-validator';

export class CreateContextCompletionDTO {
  @IsString()
  content: string;

  @IsString()
  model: string;

  @IsString()
  summarizePrompt: string;

  @IsString()
  contextPrompt: string;

  @IsString()
  token: string;
}
