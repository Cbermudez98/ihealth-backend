import { ICareer, ICareerCreate } from './ICareer';

export interface IStudentDetail {
  id: number;
  career_id: ICareer;
  semester: number;
}

export interface IStudentDetailCreate
  extends Omit<IStudentDetail, 'id' | 'career_id'> {
  career_id: ICareerCreate;
}