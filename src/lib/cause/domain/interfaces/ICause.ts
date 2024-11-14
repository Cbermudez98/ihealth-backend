import { IReason } from './../../../reason/domain/interfaces/IReason';

export interface ICause {
  id: number;
  name: string;
  reason: IReason;
}
