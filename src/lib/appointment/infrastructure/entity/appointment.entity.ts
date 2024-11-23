import { ICause } from './../../../cause/domain/interfaces/ICause';
import { IReason } from './../../../reason/domain/interfaces/IReason';
import { ISchedule } from './../../../schedule/domain/interfaces/ISchedule';
import { IUser } from './../../../user/domain/interfaces/IUser';
import { IAppointment } from '../../domain/interfaces/IAppointment';
import { IStatus } from '../../domain/interfaces/IStatus';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './../../../user/infrastructure/entity/user.entity';
import { Status } from './status.entity';
import { Reason } from './../../../reason/infrastructure/entity/reason.entity';
import { Cause } from './../../../cause/infrastructure/entity/cause.entity';
import { Schedule } from '../../../schedule/infrastructure/entity/Schedule.entity';

@Entity()
export class Appointment implements IAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => User, (user) => user.appointments)
  user: IUser;

  @ManyToOne(() => User)
  psychologist: IUser;

  @ManyToOne(() => Status, (status) => status.appointments)
  status: IStatus;

  @ManyToOne(() => Reason, (reason) => reason.appointments)
  reason: IReason;

  @ManyToOne(() => Cause, (cause) => cause.appointments)
  cause: ICause;

  @ManyToOne(() => Schedule, (schedule) => schedule.appointments)
  schedule: ISchedule;
}
