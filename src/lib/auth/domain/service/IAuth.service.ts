import { IAuth } from '../interfaces/IAuth';

export interface IAuthService {
  validateUser: (email: string) => Promise<IAuth>;
}
