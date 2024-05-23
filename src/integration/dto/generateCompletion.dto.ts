import { IsString } from 'class-validator';
import { CreateCompletionDTO } from './createCompletion.dto';

export class GenerateCompletionDTO extends CreateCompletionDTO {
  @IsString()
  token: string;
}
