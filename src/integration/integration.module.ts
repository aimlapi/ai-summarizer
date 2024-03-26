import { Module } from '@nestjs/common';
import { DeepgramService } from './deepgram/deepgram.service';
import { AIMLAPIService } from './aimlapi/aimlapi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DeepgramService, AIMLAPIService],
  exports: [DeepgramService, AIMLAPIService],
})
export class IntegrationModule {}
