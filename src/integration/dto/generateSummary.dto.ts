import { IsString } from 'class-validator';
import { CreateSummaryDTO } from './createSummary.dto';

export class GenerateSummaryDTO extends CreateSummaryDTO {
  @IsString()
  token: string;
}
