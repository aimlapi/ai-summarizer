import { isAxiosError } from 'axios';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GenerateSummaryDTO } from './integration/dto/generateSummary.dto';
import { IntegrationService } from './integration/integration.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly integrationService: IntegrationService) {}

  @UseGuards(AuthGuard)
  @Post('/summary')
  async generateSummary(@Body() payload: GenerateSummaryDTO) {
    try {
      return {
        summary: await this.integrationService.generateSummary(payload),
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
