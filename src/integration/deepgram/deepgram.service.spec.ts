import { Test, TestingModule } from '@nestjs/testing';
import { DeepgramService } from './deepgram.service';
import { ConfigModule } from '@nestjs/config';

describe('DeepgramService', () => {
  let service: DeepgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeepgramService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<DeepgramService>(DeepgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('action should be exists', () => {
    expect(service.deepgramTranscribeUrl).toBeDefined();
  });
});
