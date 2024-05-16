import { Injectable, Logger } from '@nestjs/common';
import { GenerateSummaryDTO } from './dto/generateSummary.dto';
import { AIMLAPIService } from './aimlapi/aimlapi.service';
import { ConfigService } from '@nestjs/config';
import { getContextPrompt, getSummaryPrompt } from '../common/prompt';

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);
  constructor(
    private configService: ConfigService,
    private aimlapiService: AIMLAPIService,
  ) {}

  async generateSummary(payload: GenerateSummaryDTO) {
    const now = Date.now();
    const llmModel = this.configService.getOrThrow('AIMLAPI_LLM_MODEL');
    const sttModel = this.configService.getOrThrow('AIMLAPI_STT_MODEL');

    this.logger.log(`Creating transcription from '${sttModel}'..`);
    const transcribed =
      await this.aimlapiService.createSpeechToTextTranscription({
        url: payload.url,
        model: sttModel,
      });

    const contextPrompt = getContextPrompt(payload.type);
    const summarizePrompt = getSummaryPrompt();

    this.logger.log(`Creating summary from '${llmModel}'..`);
    const summarized = await this.aimlapiService.createContextCompletion({
      model: llmModel,
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
