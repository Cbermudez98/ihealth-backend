import { ISchedule, IScheduleCreate } from '../interfaces/ISchedule';

export interface IScheduleService {
  get: (day: string) => Promise<ISchedule[]>;
  create: (schedule: IScheduleCreate) => Promise<ISchedule>;
  getSingle: (id: ISchedule['id']) => Promise<ISchedule>;
  scheduleHasBeenTaken: (id: ISchedule['id'], date: Date) => Promise<boolean>;
}
