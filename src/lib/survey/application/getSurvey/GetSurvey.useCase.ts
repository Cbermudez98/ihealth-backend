import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';
import { IUser } from 'src/lib/user/domain/interfaces/IUser';
import { IUserService } from 'src/lib/user/domain/service/IUser.service';
import { ISurveyService } from '../../domain/services/ISurvey.service';

export class GetSurveyUseCase {
  constructor(private readonly surveyService: ISurveyService) {}

  async run(id: IUser['id']) {
    const survey = await this.surveyService.getSurvey(id);
    if (!survey) {
      throw new NotFoundError('Survey not found');
    }
    return survey;
  }
}
