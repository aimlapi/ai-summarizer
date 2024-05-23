import { isAxiosError } from 'axios';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { IntegrationService } from './integration/integration.service';
import { AuthGuard } from './auth/auth.guard';
import { CreateSummaryDTO } from './integration/dto/createSummary.dto';
import { CreateImageDTO } from './integration/dto/createImage.dto';
import { CreateSpeechToTextTranscriptionDTO } from './integration/dto/createSpeechToTextTranscription.dto';
import { CreateCompletionDTO } from './integration/dto/createCompletion.dto';

@Controller()
export class AppController {
  constructor(private readonly integrationService: IntegrationService) {}

  @UseGuards(AuthGuard)
  @Post('/summary')
  async createSummary(
    @Body() payload: CreateSummaryDTO,
    @Headers('x-aimlapi-token') token: string,
  ) {
    try {
      return {
        summary: await this.integrationService.generateSummary({
          ...payload,
          token,
        }),
      };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          throw new UnauthorizedException();
        } else {
          throw new BadRequestException(error.response.data);
        }
      } else {
        throw error;
      }
    }
  }

  @UseGuards(AuthGuard)
  @Post('/completion')
  async createCompletion(
    @Body() payload: CreateCompletionDTO,
    @Headers('x-aimlapi-token') token: string,
  ) {
    try {
      return {
        completion: await this.integrationService.generateCompletion({
          ...payload,
          token,
        }),
      };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          throw new UnauthorizedException();
        } else {
          throw new BadRequestException(error.response.data);
        }
      } else {
        throw error;
      }
    }
  }

  @UseGuards(AuthGuard)
  @Post('/image')
  async createImage(
    @Body() payload: CreateImageDTO,
    @Headers('x-aimlapi-token') token: string,
  ) {
    try {
      return await this.integrationService.generateImage({
        ...payload,
        token,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          throw new UnauthorizedException();
        } else {
          throw new BadRequestException(error.response.data);
        }
      } else {
        throw error;
      }
    }
  }

  @UseGuards(AuthGuard)
  @Post('/stt')
  async createSpeechToTextTranscription(
    @Body() payload: CreateSpeechToTextTranscriptionDTO,
    @Headers('x-aimlapi-token') token: string,
  ) {
    try {
      return {
        transcription:
          await this.integrationService.generateSpeechToTextTranscription({
            ...payload,
            token,
          }),
      };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          throw new UnauthorizedException();
        } else {
          throw new BadRequestException(error.response.data);
        }
      } else {
        throw error;
      }
    }
  }

  @Get('/health')
  checkHealth() {
    return 'ok';
  }
}
