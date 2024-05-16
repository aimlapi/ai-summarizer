import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GenerateSummaryDTO } from './integration/dto/generateSummary.dto';
import { IntegrationService } from './integration/integration.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly integrationService: IntegrationService) {}

  @UseGuards(AuthGuard)
  @Post('/summary')
  generateSummary(@Body() payload: GenerateSummaryDTO) {
    return { summary: this.integrationService.generateSummary(payload) };
  }

  @Get('/health')
  checkHealth() {
    return 'ok';
  }
}
