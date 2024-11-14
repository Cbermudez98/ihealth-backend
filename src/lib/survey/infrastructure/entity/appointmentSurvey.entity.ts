import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAppointmentSurvey } from '../../domain/interfaces/IAppointmentSurvey';

@Entity('appointmentSurvey')
export class AppointmentSurvey implements IAppointmentSurvey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  competed: boolean;

  @Column()
  surveyId: number;
}
