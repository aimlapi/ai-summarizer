import { IsString } from 'class-validator';
import { CreateImageDTO } from './createImage.dto';

export class GenerateImageDTO extends CreateImageDTO {
  @IsString()
  token: string;
}
