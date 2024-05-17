import { Injectable, Logger } from '@nestjs/common';
import { GenerateSummaryDTO } from './dto/generateSummary.dto';
import { AIMLAPIService } from './aimlapi/aimlapi.service';
import { getContextPrompt, getSummaryPrompt } from '../common/prompt';

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);
  constructor(private aimlapiService: AIMLAPIService) {}

  async generateSummary(payload: GenerateSummaryDTO) {
    const now = Date.now();

    this.logger.log(`Creating transcription from '${payload.sttModel}'..`);
    const transcribed =
      await this.aimlapiService.createSpeechToTextTranscription({
        url: payload.url,
        model: payload.sttModel,
      });

    const contextPrompt = getContextPrompt(payload.type);
    const summarizePrompt = getSummaryPrompt();

    this.logger.log(`Creating summary from '${payload.sttModel}'..`);
    const summarized = await this.aimlapiService.createContextCompletion({
      model: payload.llmModel,
      content: transcribed,
      contextPrompt,
      summarizePrompt,
    });

    this.logger.log(
      `Summarize completed in ${((Date.now() - now) / 1000).toFixed(1)} seconds`,
    );

    return summarized;
  }
}
