import { IReason } from './../../../reason/domain/interfaces/IReason';

export interface ICause {
  id: number;
  name: string;
  reason: IReason;
}

export interface ICauseCreate extends Pick<ICause, 'name'> {}
export interface ICauseUpdate extends Partial<ICauseCreate> {}
