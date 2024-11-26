import { IsNotEmpty, IsString } from 'class-validator';
import { IAppointmentSurveyCreate } from '../../domain/interfaces/IAppointmentSurvey';

export class AppointmentSurvey implements IAppointmentSurveyCreate {
  @IsNotEmpty()
  @IsString()
  competed: boolean;

  @IsNotEmpty()
  @IsString()
  surveyId: number;
}
