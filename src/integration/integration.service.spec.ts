import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationService } from './integration.service';
import { IntegrationModule } from './integration.module';

describe('IntegrationService', () => {
  let service: IntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IntegrationModule],
      providers: [IntegrationService],
    }).compile();

    service = module.get<IntegrationService>(IntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('action should be defined', () => {
    expect(service.generateSummary).toBeDefined();
  });
});
