import { IsNotEmpty, IsString } from 'class-validator';
import { IAppointmentSurveyCreate } from '../../domain/interfaces/IAppointmentSurvey';

export class AppointmentService implements IAppointmentSurveyCreate {
  @IsNotEmpty()
  @IsString()
  competed: boolean;

  @IsNotEmpty()
  @IsString()
  surveyId: number;
}
