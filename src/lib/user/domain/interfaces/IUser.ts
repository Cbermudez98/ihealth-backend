import {
  IAuth,
  IAuthCreate,
  IAuthUpdateDto,
} from '../../../auth/domain/interfaces/IAuth';
import { IDirection, IDirectionCreate, IDirectionUpdate } from './IDirection';
import {
  IRole,
  IRoleAssign,
  IRoleAssignUpdate,
} from '../../../role/domain/interfaces/IRole';
import {
  IStudentDetail,
  IStudentDetailCreate,
  IStudentDetailUpdateDto,
} from './IStudentDetail';

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

export interface IUserUpdate
  extends Partial<
    Omit<IUserCreate, 'auth' | 'direction' | 'student_detail' | 'role'>
  > {
  auth: IAuthUpdateDto;
  direction: IDirectionUpdate;
  student_detail: IStudentDetailUpdateDto;
  role: IRoleAssignUpdate;
}

export interface IUserDto extends Omit<IUser, 'id'> {}
