import { ISurvey, ISurveyCreate, ISurveyUpdate } from '../interfaces/ISurvey';

export class ISurveyService {
  createSurvey: (survey: ISurveyCreate) => Promise<ISurvey>;
  getSurvey: (id: ISurvey['id']) => Promise<ISurvey>;
  updateSurvey: (
    id: ISurvey['id'],
    surveyToUpdate: ISurveyUpdate,
  ) => Promise<boolean>;
}
