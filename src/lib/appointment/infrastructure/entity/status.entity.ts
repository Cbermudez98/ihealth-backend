import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IStatus, STATUS } from '../../domain/interfaces/IStatus';
import { IAppointment } from '../../domain/interfaces/IAppointment';
import { Appointment } from './appointment.entity';

@Entity('status')
export class Status implements IStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
  })
  name: STATUS;

  @OneToMany(() => Appointment, (appointment) => appointment.status)
  appointments: IAppointment[];
}
