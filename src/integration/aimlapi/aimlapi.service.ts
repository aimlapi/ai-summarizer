import axios, { Axios } from 'axios';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateContextCompletionDTO } from '../dto/createContextCompletion.dto';
import { CreateSpeechToTextTranscriptionDTO } from '../dto/createSpeechToTextTranscription.dto';

@Injectable()
export class AIMLAPIService {
  api: Axios;
  constructor(private configService: ConfigService) {
    const baseURL = this.configService.getOrThrow('AIMLAPI_HOST');
    this.api = axios.create({
      baseURL,
    });
  }

  async createContextCompletion(payload: CreateContextCompletionDTO) {
    const { model, content, contextPrompt, summarizePrompt } = payload;

    const { data: summarizedCompletion } = await this.api.post(
      '/chat/completions',
      {
        model: payload.model,
        messages: [
          { role: 'system', content: summarizePrompt },
          { role: 'user', content },
        ],
      },
    );
    const { data: contextedCompletion } = await this.api.post(
      '/chat/completions',
      {
        model,
        messages: [
          { role: 'system', content: contextPrompt },
          {
            role: 'user',
            content: summarizedCompletion.choices[0].message.content,
          },
        ],
      },
    );

    return contextedCompletion.choices[0].message.content as string;
  }

  async createSpeechToTextTranscription(
    payload: CreateSpeechToTextTranscriptionDTO,
  ) {
    const { url, model } = payload;
    const {
      data: {
        results: {
          channels: [
            {
              alternatives: [{ transcript }],
            },
          ],
        },
      },
    } = await this.api.post('/stt', {
      model,
      url,
    });

    return transcript as string;
  }
}
