import { IReason, IReasonCreate, IReasonUpdate } from '../interfaces/IReason';

export interface IReasonService {
  create: (reason: IReasonCreate) => Promise<IReason>;
  get: (id: IReason['id']) => Promise<IReason>;
  getAll: () => Promise<IReason[]>;
  update: (id: IReason['id'], reason: IReasonUpdate) => Promise<boolean>;
}
