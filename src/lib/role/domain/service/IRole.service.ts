import { IRole } from '../interfaces/IRole';

export interface IRoleService {
  get: (id: IRole['id']) => Promise<IRole>;
  getAll: () => Promise<IRole[]>;
}
