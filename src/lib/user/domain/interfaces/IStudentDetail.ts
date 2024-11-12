import {
  ICareer,
  ICarrerAssing,
} from '../../../career/domain/interfaces/ICareer';

export interface IStudentDetail {
  id: number;
  career: ICareer;
  semester: number;
}

export interface IStudentDetailCreate
  extends Omit<IStudentDetail, 'id' | 'career'> {
  career: ICarrerAssing;
}
