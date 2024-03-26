import { IsString } from 'class-validator';

export class AIMLAPIGenerateSummaryDTO {
  @IsString()
  transcribed: string;

  @IsString()
  type: string;
}
