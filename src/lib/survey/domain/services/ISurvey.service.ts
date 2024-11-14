import { Injectable } from '@nestjs/common';
import { ISurvey, ISurveyCreate, ISurveyUpdate } from '../interfaces/ISurvey';

@Injectable()
export class ISurveyService {
  createSurvey: (survey: ISurveyCreate) => Promise<ISurvey>;
  getSurvey: (id: ISurvey['id']) => Promise<ISurvey>;
  updateSurvey: (
    id: ISurvey['id'],
    surveyToUpdate: ISurveyUpdate,
  ) => Promise<ISurvey>;
}
