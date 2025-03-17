import { IAppointment } from './../../../appointment/domain/interfaces/IAppointment';
import {
  ICause,
  ICauseCreate,
} from './../../../cause/domain/interfaces/ICause';

export interface IReason {
  id: number;
  name: string;
  causes: ICause[];
  appointments: IAppointment[];
}

export interface IReasonCreate extends Pick<IReason, 'name'> {}
export interface IReasonUpdate extends Partial<IReasonCreate> {}
export interface IReasonSeederMock extends Pick<IReason, 'name'> {
  causes: ICauseCreate[];
}
