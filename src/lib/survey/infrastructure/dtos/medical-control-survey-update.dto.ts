import { PartialType } from '@nestjs/mapped-types';
import { MedicalControlSurvey } from './medical-control-survey.dto';

export class MedicalControlSurveyUpdate extends PartialType(
  MedicalControlSurvey,
) {}
