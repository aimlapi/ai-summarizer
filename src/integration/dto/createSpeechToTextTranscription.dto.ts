import { IsString, IsUrl } from 'class-validator';

export class CreateSpeechToTextTranscriptionDTO {
  @IsUrl()
  url: string;

  @IsString()
  model: string;
}
