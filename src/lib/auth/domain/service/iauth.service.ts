import { IAuth } from '../interfaces/IAuth';

export interface IAuthService {
  login: (id: any) => Promise<{ access_token: string }>;
  validateUser: (email: string) => Promise<IAuth>;
}
