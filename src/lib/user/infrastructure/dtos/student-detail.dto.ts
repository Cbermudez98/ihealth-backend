import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { ICareer } from '../../../career/domain/interfaces/ICareer';
import { IStudentDetailCreate } from '../../domain/interfaces/IStudentDetail';
import { Type } from 'class-transformer';
import { CareerDto } from '../../../career/infrastructure/dtos/career.dto';

export class StudentDetailDto implements IStudentDetailCreate {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CareerDto)
  career_id: ICareer;

  @IsNotEmpty()
  @IsInt()
  semester: number;
}
