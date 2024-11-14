import { IsNotEmpty, IsString } from 'class-validator';
import { IMedicalControlSurveyCreate } from '../../domain/interfaces/IMedicalControlSurvey';

export class MedicalControlSurvey implements IMedicalControlSurveyCreate {
  @IsNotEmpty()
  @IsString()
  completed: boolean;

  @IsNotEmpty()
  @IsString()
  surveyId: number;

  @IsNotEmpty()
  @IsString()
  medicalControlId: number;
}
