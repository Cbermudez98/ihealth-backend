import { ICareer } from '../interfaces/ICareer';

export interface ICareerService {
  get: (id: ICareer['id']) => Promise<ICareer>;
  getAll: () => Promise<ICareer[]>;
}
