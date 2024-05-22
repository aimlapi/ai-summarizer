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

@Controller()
export class AppController {
  constructor(private readonly integrationService: IntegrationService) {}

  @UseGuards(AuthGuard)
  @Post('/summary')
  async generateSummary(
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

  @Get('/health')
  checkHealth() {
    return 'ok';
  }
}
