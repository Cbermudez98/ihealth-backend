import { ICause } from './../../../cause/domain/interfaces/ICause';
import { IReason } from '../../domain/interfaces/IReason';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Cause } from '../../../cause/infrastructure/entity/cause.entity';
import { IAppointment } from './../../../appointment/domain/interfaces/IAppointment';
import { Appointment } from './../../../appointment/infrastructure/entity/appointment.entity';

@Entity()
export class Reason implements IReason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cause, (cause) => cause.reason)
  causes: ICause[];

  @OneToMany(() => Appointment, (appointment) => appointment.reason)
  appointments: IAppointment[];
}
