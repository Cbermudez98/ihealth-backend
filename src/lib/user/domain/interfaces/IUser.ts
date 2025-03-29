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
import { IAppointment } from './../../../appointment/domain/interfaces/IAppointment';
import { IDocument, IDocumentUser } from './IDocument';

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
  appointments: IAppointment[];
  document: IDocument;
  document_number: string;
}

export interface IUserCreate
  extends Omit<
    IUser,
    | 'id'
    | 'direction'
    | 'auth'
    | 'student_detail'
    | 'role'
    | 'appointments'
    | 'document'
  > {
  auth: IAuthCreate;
  direction: IDirectionCreate;
  student_detail: IStudentDetailCreate;
  role: IRoleAssign;
  document: IDocumentUser;
}

export interface IUserUpdate
  extends Partial<
    Omit<
      IUserCreate,
      'auth' | 'direction' | 'student_detail' | 'role' | 'appointments'
    >
  > {
  auth: IAuthUpdateDto;
  direction: IDirectionUpdate;
  student_detail: IStudentDetailUpdateDto;
  role: IRoleAssignUpdate;
}

export interface IUserDto extends Omit<IUser, 'id' | 'appointments'> {}
