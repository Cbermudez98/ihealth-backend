import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IMedicalControlSurvey } from '../../domain/interfaces/IMedicalControlSurvey';

@Entity('medical-control-survey')
export class MedicalControlSurvey implements IMedicalControlSurvey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  completed: boolean;

  @Column()
  surveyId: number;

  @Column()
  medicalControlId: number;
}
