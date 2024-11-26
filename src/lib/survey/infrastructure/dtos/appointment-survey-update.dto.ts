import { PartialType } from '@nestjs/mapped-types';
import { AppointmentSurvey } from './appointmentSurvey.dto';

export class AppointmentSurveyUpdate extends PartialType(AppointmentSurvey) {}
