import { Test, TestingModule } from '@nestjs/testing';
import { AIMLAPIService } from './aimlapi.service';
import { ConfigModule } from '@nestjs/config';

describe('AimlapiService', () => {
  let service: AIMLAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIMLAPIService],
      imports: [
        ConfigModule.forFeature(async () => ({
          AIMLAPI_HOST: 'host',
          AIMLAPI_TOKEN: 'token',
        })),
      ],
    }).compile();

    service = module.get<AIMLAPIService>(AIMLAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('action should be exists', () => {
    expect(service.generateContextCompletion).toBeDefined();
    expect(service.generateCompletion).toBeDefined();
    expect(service.generateImage).toBeDefined();
    expect(service.generateSpeechToTextTranscription).toBeDefined();
  });
});
