import { Module } from '@nestjs/common';
import { SurveyService } from './infrastructure/service/survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './infrastructure/entity/survey.entity';
import { CreateSurveyUseCase } from './application/createSurvey/CreateSurvey.useCase';
import { ISurveyService } from './domain/services/ISurvey.service';
import { GetSurveyUseCase } from './application/getSurvey/GetSurvey.useCase';
import { UpdateSurveyUseCase } from './application/updateSurvey/UpdateSurvey.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  controllers: [],
  providers: [
    {
      provide: 'SurveyService',
      useClass: SurveyService,
    },
    {
      provide: 'CreateSurveyUseCase',
      useFactory: (SurveyService: SurveyService) =>
        new CreateSurveyUseCase(SurveyService),
      inject: ['SurveyService'],
    },
    {
      provide: 'GetSurveyUseCase',
      useFactory: (SurveyService: ISurveyService) =>
        new GetSurveyUseCase(SurveyService),
      inject: ['SurveyService'],
    },
    {
      provide: 'UpdateSurveyUseCase',
      useFactory: (SurveyService: ISurveyService) =>
        new UpdateSurveyUseCase(SurveyService),
      inject: ['SurveyService'],
    },
  ],
})
export class SurveyModule {}
