import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';
import { ISurvey, ISurveyUpdate } from '../../domain/interfaces/ISurvey';
import { ISurveyService } from '../../domain/services/ISurvey.service';

export class UpdateSurveyUseCase {
  constructor(private readonly surveyService: ISurveyService) {}

  async run(id: ISurvey['id'], updatedSurvey: ISurveyUpdate) {
    const survey = await this.surveyService.getSurvey(id);
    if (!survey) {
      throw new NotFoundError('Survey not found');
    }

    await this.surveyService.updateSurvey(id, updatedSurvey);
    return true;
  }
}

//por terminar
