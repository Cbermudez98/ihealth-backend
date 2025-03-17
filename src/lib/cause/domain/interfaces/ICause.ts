import { IAppointment } from './../../../appointment/domain/interfaces/IAppointment';
import { IReason } from './../../../reason/domain/interfaces/IReason';

export interface ICause {
  id: number;
  name: string;
  reason: IReason;
  appointments: IAppointment[];
}

export interface ICauseCreate extends Pick<ICause, 'name'> {}
export interface ICauseUpdate extends Partial<ICauseCreate> {}
