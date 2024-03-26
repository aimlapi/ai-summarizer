import { IsString, IsUrl } from 'class-validator';

export class GenerateSummaryDTO {
  @IsUrl()
  url: string;

  @IsString()
  type: string;
}
