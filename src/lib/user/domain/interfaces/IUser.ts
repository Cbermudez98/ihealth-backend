import { IAuth, IAuthCreate } from './IAuth';
import { IDirection, IDirectionCreate } from './IDirection';
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
}

export interface IUserCreate
  extends Omit<IUser, 'id' | 'direction' | 'auth' | 'student_detail'> {
  auth: IAuthCreate;
  direction: IDirectionCreate;
  student_detail: IStudentDetailCreate;
}

export interface IUserDto extends Omit<IUser, 'id'> {}
