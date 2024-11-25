import { IStatus } from '../interfaces/IStatus';

export interface IStatusService {
  get: (id: IStatus['id']) => Promise<IStatus>;
}
