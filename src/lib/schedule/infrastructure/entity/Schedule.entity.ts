import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ISchedule } from '../../domain/interfaces/ISchedule';
import { IAppointment } from './../../../appointment/domain/interfaces/IAppointment';
import { Appointment } from './../../../appointment/infrastructure/entity/appointment.entity';

@Entity()
export class Schedule implements ISchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column({
    type: 'time',
  })
  start_time: string;

  @Column({
    type: 'time',
  })
  end_time: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.schedule)
  appointments: IAppointment[];
}
