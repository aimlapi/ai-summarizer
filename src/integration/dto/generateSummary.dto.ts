import { IsString, IsUrl, MaxLength } from 'class-validator';

export class GenerateSummaryDTO {
  @IsUrl()
  url: string;

  @IsString()
  @MaxLength(30)
  type: string;

  @IsString()
  llmModel: string;

  @IsString()
  sttModel: string;
}
