import { IRole } from '../interfaces/IRole';

export interface IRoleService {
  get: (id: IRole['id']) => Promise<IRole>;
  getByName: (name: IRole['name']) => Promise<IRole>;
  getAll: () => Promise<IRole[]>;
}
