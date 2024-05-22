import { IsString, IsUrl, MaxLength } from 'class-validator';
import { CreateSummaryDTO } from './createSummary.dto';

export class GenerateSummaryDTO extends CreateSummaryDTO {
  @IsUrl()
  url: string;

  @IsString()
  @MaxLength(30)
  type: string;

  @IsString()
  llmModel: string;

  @IsString()
  sttModel: string;

  @IsString()
  token: string;
}
