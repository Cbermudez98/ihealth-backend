import { IUser } from '../../../user/domain/interfaces/IUser';
import { IStatus } from './IStatus';
import { IReason } from '../../../reason/domain/interfaces/IReason';
import { ICause } from '../../../cause/domain/interfaces/ICause';
import { ISchedule } from '../../../schedule/domain/interfaces/ISchedule';

export interface IAppointment {
  id: number;
  user: IUser;
  psychologist: IUser;
  description: string;
  date: Date;
  status: IStatus;
  reason: IReason;
  cause: ICause;
  schedule: ISchedule;
}

export interface IAppointmentCreate
  extends Pick<IAppointment, 'date' | 'description'> {
  user: number;
  psychologist: number;
  status: number;
  reason: number;
  cause: number;
  schedule: number;
}

export interface IAppointmentSave extends Omit<IAppointment, 'id'> {}
