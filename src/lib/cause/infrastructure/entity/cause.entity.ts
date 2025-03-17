import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICause } from '../../domain/interfaces/ICause';
import { IReason } from '../../../reason/domain/interfaces/IReason';
import { Reason } from '../../../reason/infrastructure/entity/reason.entity';
import { IAppointment } from '../../../appointment/domain/interfaces/IAppointment';
import { Appointment } from '../../../appointment/infrastructure/entity/appointment.entity';

@Entity()
export class Cause implements ICause {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Reason, (reason) => reason.causes)
  reason: IReason;

  @OneToMany(() => Appointment, (appointment) => appointment.cause)
  appointments: IAppointment[];
}
