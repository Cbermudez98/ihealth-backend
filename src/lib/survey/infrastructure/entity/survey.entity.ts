import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ISurvey } from '../../domain/interfaces/ISurvey';
import { MedicalControlSurvey } from './medical-control-survey.entity';
import { IMedicalControlSurvey } from '../../domain/interfaces/IMedicalControlSurvey';
import { Question } from './question.entity';
import { IQuestion } from '../../domain/interfaces/IQuestion';
import { AppointmentSurvey } from './appointmentSurvey.entity';
import { IAppointmentSurvey } from '../../domain/interfaces/IAppointmentSurvey';

@Entity('survey')
export class Survey implements ISurvey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  available: boolean;

  @OneToMany(
    () => MedicalControlSurvey,
    (medicalControlSurvey) => medicalControlSurvey,
  )
  @JoinColumn()
  medicalControlSurvey: IMedicalControlSurvey;

  @OneToOne(() => Question, (question) => question)
  @JoinColumn()
  question: IQuestion;

  @OneToMany(() => AppointmentSurvey, (appointmentSurvey) => appointmentSurvey)
  @JoinColumn()
  appointmentSurvey: IAppointmentSurvey;

  //completar relaciones
}
