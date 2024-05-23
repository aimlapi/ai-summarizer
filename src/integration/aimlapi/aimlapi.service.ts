import axios, { Axios } from 'axios';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GenerateContextCompletionDTO } from '../dto/generateContextCompletion.dto';
import { GenerateSpeechToTextTranscriptionDTO } from '../dto/generateSpeechToTextTranscription.dto';
import { GenerateImageDTO } from '../dto/generateImage.dto';
import { GenerateCompletionDTO } from '../dto/generateCompletion.dto';

@Injectable()
export class AIMLAPIService {
  api: Axios;
  constructor(private configService: ConfigService) {
    const baseURL = this.configService.getOrThrow('AIMLAPI_HOST');
    this.api = axios.create({
      baseURL,
    });
  }

  async generateImage(payload: GenerateImageDTO) {
    const { token, ...rest } = payload;
    const { data } = await this.api.post('/images/generations', rest, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data as any;
  }

  async generateContextCompletion(payload: GenerateContextCompletionDTO) {
    const { model, content, token, contextPrompt, summarizePrompt } = payload;

    const { data: summarizedCompletion } = await this.api.post(
      '/chat/completions',
      {
        model,
        messages: [
          { role: 'system', content: summarizePrompt },
          { role: 'user', content },
        ],
      },
      { headers: { Authorization: `Bearer ${token}` } },
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
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return contextedCompletion.choices[0].message.content as string;
  }

  async generateCompletion(payload: GenerateCompletionDTO) {
    const { token, prompt, message, ...rest } = payload;
    const { data: result } = await this.api.post(
      '/chat/completions',
      {
        messages: [
          { role: 'system', content: prompt },
          {
            role: 'user',
            content: message,
          },
        ],
        ...rest,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return result;
  }

  async generateSpeechToTextTranscription(
    payload: GenerateSpeechToTextTranscriptionDTO,
  ) {
    const { url, model, token } = payload;
    const { data } = await this.api.post(
      '/stt',
      {
        model,
        url,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return data as any;
  }
}
