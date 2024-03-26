import { IsUrl } from 'class-validator';

export class DeepgramTranscribeUrlDTO {
  @IsUrl()
  url: string;
}
