import { Test, TestingModule } from '@nestjs/testing';
import { AIMLAPIService } from './aimlapi.service';
import { ConfigModule } from '@nestjs/config';

describe('AimlapiService', () => {
  let service: AIMLAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIMLAPIService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<AIMLAPIService>(AIMLAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('action should be exists', () => {
    expect(service.mlaiApiGenerateSummary).toBeDefined();
  });
});
