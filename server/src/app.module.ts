import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from './mitigationQuestionsService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EnvironmentQuestionsService, MitigationQuestionsService],
})
export class AppModule {}
