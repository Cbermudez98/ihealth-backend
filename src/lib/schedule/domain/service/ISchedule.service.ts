import { ISchedule, IScheduleCreate } from '../interfaces/ISchedule';

export interface IScheduleService {
  get: () => Promise<ISchedule[]>;
  create: (schedule: IScheduleCreate) => Promise<ISchedule>;
}
