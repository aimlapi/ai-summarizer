import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IntegrationService } from './integration/integration.service';
import { ConfigModule } from '@nestjs/config';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [ConfigModule.forRoot(), IntegrationModule],
  controllers: [AppController],
  providers: [IntegrationService],
})
export class AppModule {}
