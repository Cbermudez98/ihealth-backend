import { ICause } from 'src/lib/cause/domain/interfaces/ICause';

export interface IReason {
  id: number;
  name: string;
  causes: ICause[];
}

export interface IReasonCreate extends Omit<IReason, 'id' | 'causes'> {}
export interface IReasonUpdate extends Partial<IReasonCreate> {}
