import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { IntegrationModule } from './integration/integration.module';
import { ConfigModule } from '@nestjs/config';
import { IntegrationService } from './integration/integration.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IntegrationModule, ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [IntegrationService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health ok', () => {
    expect(controller.checkHealth()).toBe('ok');
  });
});
