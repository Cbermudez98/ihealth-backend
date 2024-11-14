import { Module } from '@nestjs/common';
import { ServiceService } from './domain/service/service.service';
import { IsurveyService } from './services/isurvey/isurvey.service';
import { IsurveyService } from './domain/services/ISurvey.service';

@Module({
  providers: [ServiceService, IsurveyService],
})
export class SurveyModule {}
