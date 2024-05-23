import { Injectable, Logger } from '@nestjs/common';
import { GenerateSummaryDTO } from './dto/generateSummary.dto';
import { AIMLAPIService } from './aimlapi/aimlapi.service';
import { getContextPrompt, getSummaryPrompt } from '../common/prompt';
import { GenerateImageDTO } from './dto/generateImage.dto';
import { GenerateCompletionDTO } from './dto/generateCompletion.dto';
import { GenerateSpeechToTextTranscriptionDTO } from './dto/generateSpeechToTextTranscription.dto';

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);
  constructor(private aimlapiService: AIMLAPIService) {}

  async generateSummary(payload: GenerateSummaryDTO) {
    const now = Date.now();

    this.logger.log(`Creating transcription with '${payload.sttModel}'..`);
    const transcribed =
      await this.aimlapiService.generateSpeechToTextTranscription({
        url: payload.url,
        model: payload.sttModel,
        token: payload.token,
      });

    const {
      results: {
        channels: [
          {
            alternatives: [{ transcript }],
          },
        ],
      },
    } = transcribed;

    const contextPrompt = getContextPrompt(payload.type);
    const summarizePrompt = getSummaryPrompt();

    this.logger.log(`Creating summary with '${payload.sttModel}'..`);
    const summarized = await this.aimlapiService.generateContextCompletion({
      model: payload.llmModel,
      token: payload.token,
      content: transcript,
      contextPrompt,
      summarizePrompt,
    });

    this.logger.log(
      `Summarize completed in ${((Date.now() - now) / 1000).toFixed(1)} seconds`,
    );

    return summarized;
  }

  async generateImage(payload: GenerateImageDTO) {
    const now = Date.now();
    this.logger.log(`Creating image with '${payload.model}'..`);
    const result = await this.aimlapiService.generateImage(payload);
    this.logger.log(
      `Image generation completed in ${((Date.now() - now) / 1000).toFixed(1)} seconds`,
    );
    return result;
  }

  async generateCompletion(payload: GenerateCompletionDTO) {
    const now = Date.now();
    this.logger.log(`Creating completion with '${payload.model}'..`);
    const result = await this.aimlapiService.generateCompletion(payload);
    this.logger.log(
      `Completion generation completed in ${((Date.now() - now) / 1000).toFixed(1)} seconds`,
    );
    return result;
  }

  async generateSpeechToTextTranscription(
    payload: GenerateSpeechToTextTranscriptionDTO,
  ) {
    const now = Date.now();
    this.logger.log(`Creating transcription with '${payload.model}'..`);
    const result =
      await this.aimlapiService.generateSpeechToTextTranscription(payload);
    this.logger.log(
      `Transcription generation completed in ${((Date.now() - now) / 1000).toFixed(1)} seconds`,
    );
    return result;
  }
}
