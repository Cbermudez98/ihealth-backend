import { IReason } from 'src/lib/reason/domain/interfaces/IReason';
import { ICause, ICauseCreate, ICauseUpdate } from '../interfaces/ICause';

export interface ICauseService {
  create: (id: IReason['id'], cause: ICauseCreate) => Promise<ICause>;
  update: (id: ICause['id'], cause: ICauseUpdate) => Promise<boolean>;
  get: (id: IReason['id']) => Promise<ICause[]>;
  getSingle: (id: ICause['id']) => Promise<ICause>;
}
