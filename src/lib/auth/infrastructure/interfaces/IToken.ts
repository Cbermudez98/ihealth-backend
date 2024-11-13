import { ROLES } from './../../../../common/constants/roles.enum';

export interface ITokenPayload {
  id: number;
  role: ROLES;
  iat: number;
  exp: number;
}
