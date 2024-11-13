import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import {
  ICareer,
  ICarrerAssing,
} from '../../../career/domain/interfaces/ICareer';
import { IStudentDetailCreate } from '../../domain/interfaces/IStudentDetail';
import { Type } from 'class-transformer';
import { CareerDto } from '../../../career/infrastructure/dtos/career.dto';

export class StudentDetailDto implements IStudentDetailCreate {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CareerDto)
  career: ICarrerAssing;

  @IsNotEmpty()
  @IsInt()
  semester: number;
}
