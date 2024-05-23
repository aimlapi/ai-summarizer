import { IsString } from 'class-validator';
import { CreateSpeechToTextTranscriptionDTO } from './createSpeechToTextTranscription.dto';

export class GenerateSpeechToTextTranscriptionDTO extends CreateSpeechToTextTranscriptionDTO {
  @IsString()
  token: string;
}
