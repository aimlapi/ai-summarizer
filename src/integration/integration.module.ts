import { Module } from '@nestjs/common';
import { AIMLAPIService } from './aimlapi/aimlapi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AIMLAPIService],
  exports: [AIMLAPIService],
})
export class IntegrationModule {}
