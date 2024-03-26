import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateSummaryDTO } from './integration/dto/generateSummary.dto';
import { IntegrationService } from './integration/integration.service';

@Controller()
export class AppController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post('/summary')
  generateSummary(@Body() payload: GenerateSummaryDTO) {
    return this.integrationService.generateSummary(payload);
  }

  @Get('/health')
  checkHealth() {
    return 'ok';
  }
}
