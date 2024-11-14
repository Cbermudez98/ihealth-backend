import {
  ICareer,
  ICareerUpdateDto,
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

export interface IStudentDetailUpdateDto
  extends Partial<Omit<IStudentDetailCreate, 'career'>> {
  career: ICareerUpdateDto;
}
