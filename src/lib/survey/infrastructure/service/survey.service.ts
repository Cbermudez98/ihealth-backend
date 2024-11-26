import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../entity/survey.entity';
import { Repository } from 'typeorm';
import { ISurveyService } from '../../domain/services/ISurvey.service';
import {
  ISurveyCreate,
  ISurvey,
  ISurveyUpdate,
} from '../../domain/interfaces/ISurvey';

@Injectable()
export class SurveyService implements ISurveyService {
  constructor(
    @InjectRepository(Survey) private readonly surveyRepo: Repository<Survey>,
  ) {}
  async createSurvey(surveyDto: ISurveyCreate): Promise<ISurvey> {
    let survey: Survey | undefined;
    try {
      survey = await this.surveyRepo.create(surveyDto);
    } catch (error) {
      throw new RequestTimeoutException('Cannot create survey --- ', {
        description: 'Error creating survey',
      });
    }
    return survey;
  }

  async getSurvey(id: ISurvey['id']): Promise<ISurvey> {
    let survey: ISurvey | undefined;
    try {
      survey = await this.surveyRepo.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(' --- Cannot get survey --- ');
    }
    return survey;
  }

  async updateSurvey(
    id: ISurvey['id'],
    surveyToUpdate: Partial<ISurveyUpdate>,
  ): Promise<boolean> {
    const survey = await this.getSurvey(id);

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    } else {
      try {
        // Actualiza de manera parcial
        const updatedSurvey = {
          ...survey, // Conserva
          ...surveyToUpdate, // Sobrescribe
        };

        // Guarda
        await this.surveyRepo.save(updatedSurvey);
      } catch (error) {
        throw new RequestTimeoutException('Error updating survey');
      }
    }

    return true;
  }
}
