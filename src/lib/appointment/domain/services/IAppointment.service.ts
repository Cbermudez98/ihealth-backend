import { IUser } from '../../../../lib/user/domain/interfaces/IUser';
import { IAppointment, IAppointmentSave } from '../interfaces/IAppointment';
import { IStatus } from '../interfaces/IStatus';
import { IFilterSchedule } from '../../../../lib/schedule/domain/interfaces/ISchedule';

export interface IAppointmentService {
  create: (appointment: IAppointmentSave) => Promise<IAppointment>;
  getActiveAppointmentUser: (id: IUser['id']) => Promise<boolean>;
  changeStatus: (
    appointment: IAppointment,
    status: IStatus,
  ) => Promise<boolean>;
  get: (id: IAppointment['id']) => Promise<IAppointment>;
  getByUserId: (id: IUser['id']) => Promise<IAppointment>;
  getHistory: (id: IUser['id']) => Promise<IAppointment[]>;
  getAppointmentsByDate: (schedule: IFilterSchedule) => Promise<IAppointment[]>;
  getAll: () => Promise<IAppointment[]>;
}
