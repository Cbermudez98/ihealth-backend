import { IAuth, IAuthCreate } from '../../../auth/domain/interfaces/IAuth';
import { IDirection, IDirectionCreate } from './IDirection';
import { IRole, IRoleAssign } from '../../../role/domain/interfaces/IRole';
import { IStudentDetail, IStudentDetailCreate } from './IStudentDetail';

export interface IUser {
  id: number;
  name: string;
  last_name: string;
  age: number;
  code: number;
  gender: string;
  auth: IAuth;
  direction: IDirection;
  student_detail: IStudentDetail;
  role: IRole;
}

export interface IUserCreate
  extends Omit<IUser, 'id' | 'direction' | 'auth' | 'student_detail' | 'role'> {
  auth: IAuthCreate;
  direction: IDirectionCreate;
  student_detail: IStudentDetailCreate;
  role: IRoleAssign;
}

export interface IUserUpdate extends Partial<IUserCreate> {}

export interface IUserDto extends Omit<IUser, 'id'> {}
