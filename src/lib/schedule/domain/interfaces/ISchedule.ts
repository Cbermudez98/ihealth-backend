import { IAppointment } from './../../../appointment/domain/interfaces/IAppointment';

export interface ISchedule {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  appointments: IAppointment[];
}

export interface IScheduleCreate
  extends Omit<ISchedule, 'id' | 'appointments'> {}

export interface IFilterSchedule extends Pick<ISchedule, 'day'> {
  date: string;
}
