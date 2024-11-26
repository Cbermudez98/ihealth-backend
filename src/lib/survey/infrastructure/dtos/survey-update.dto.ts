import { PartialType } from '@nestjs/mapped-types';
import { SurveyDto } from './survey.dto';

export class SurveyUpdate extends PartialType(SurveyDto) {}
