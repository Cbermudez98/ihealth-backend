import { IsNotEmpty, IsString } from 'class-validator';
import { ISurveyCreate } from '../../domain/interfaces/ISurvey';

export class SurveyDto implements ISurveyCreate {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  available: boolean;
}
