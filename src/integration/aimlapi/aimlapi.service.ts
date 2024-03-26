import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { AIMLAPIGenerateSummaryDTO } from '../dto/aimlApiGenerateSummary.dto';
import { ConfigService } from '@nestjs/config';
import { getContextPrompt, getSummaryPrompt } from '../../common/prompt';

@Injectable()
export class AIMLAPIService {
  constructor(private configService: ConfigService) {}

  async mlaiApiGenerateSummary(payload: AIMLAPIGenerateSummaryDTO) {
    const host = this.configService.getOrThrow('AIMLAPI_HOST');
    const model = this.configService.getOrThrow('AIMLAPI_MODEL');
    const token = this.configService.getOrThrow('AIMLAPI_TOKEN');
    const openai = new OpenAI({ apiKey: token, baseURL: host });

    let completions = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: getSummaryPrompt() },
        { role: 'user', content: payload.transcribed },
      ],
    });

    const message = completions.choices[0].message.content;
    completions = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: getContextPrompt(payload.type) },
        { role: 'user', content: message },
      ],
    });

    return completions.choices[0].message.content;
  }
}
