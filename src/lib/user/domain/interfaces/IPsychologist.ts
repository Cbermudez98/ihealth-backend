import { IUserCreate } from './IUser';

export interface IPsychologistCreate
  extends Omit<IUserCreate, 'student_detail' | 'role'> {}
