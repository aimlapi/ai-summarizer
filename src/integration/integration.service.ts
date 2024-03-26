import { Injectable } from '@nestjs/common';
import { GenerateSummaryDTO } from './dto/generateSummary.dto';
import { AIMLAPIService } from './aimlapi/aimlapi.service';
import { DeepgramService } from './deepgram/deepgram.service';

@Injectable()
export class IntegrationService {
  constructor(
    private aimlapiService: AIMLAPIService,
    private deepgramService: DeepgramService,
  ) {}

  async generateSummary(payload: GenerateSummaryDTO) {
    const transcribed = await this.deepgramService.deepgramTranscribeUrl({
      url: payload.url,
    });
    const summarized = await this.aimlapiService.mlaiApiGenerateSummary({
      type: payload.type,
      transcribed: transcribed.results.channels[0].alternatives[0].transcript,
    });

    return summarized;
  }
}
