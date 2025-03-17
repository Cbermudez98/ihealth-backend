import { IAppointment } from './IAppointment';

export enum STATUS {
  ATTENDED = 'attended',
  PENDING = 'pending',
  CLOSE = 'close',
}

export interface IStatus {
  id: number;
  name: STATUS;
  appointments: IAppointment[];
}

export interface IStatusCreate extends Pick<IStatus, 'name'> {}
