import { ISurvey, ISurveyCreate } from '../../domain/interfaces/ISurvey';
import { ISurveyService } from '../../domain/services/ISurvey.service';

export class CreateSurveyUseCase {
  constructor(private readonly surveyService: ISurveyService) {}

  async run(data: ISurveyCreate): Promise<ISurvey> {
    try {
      const survey = await this.surveyService.createSurvey(data);
      return survey;
    } catch (e) {
      throw new Error('Failed to create survey');
    }
  }
}
