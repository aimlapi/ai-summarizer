import * as deepgram from '@deepgram/sdk';
import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepgramTranscribeUrlDTO } from '../dto/deepgramTranscribeUrl.dto';

@Injectable()
export class DeepgramService implements OnModuleInit {
  private deepgramApi: deepgram.DeepgramClient;
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.deepgramApi = deepgram.createClient(
      this.configService.getOrThrow('DEEPGRAM_TOKEN'),
    );
  }

  async deepgramTranscribeUrl(payload: DeepgramTranscribeUrlDTO) {
    const { result, error } =
      await this.deepgramApi.listen.prerecorded.transcribeUrl(
        {
          url: payload.url,
        },
        {
          model: 'nova-2',
          smart_format: true,
        },
      );

    if (error) {
      throw new HttpException('Deepgram failed', 400);
    }

    return result;
  }
}
