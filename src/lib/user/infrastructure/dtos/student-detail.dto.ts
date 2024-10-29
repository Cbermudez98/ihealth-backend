import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { ICareer } from '../../domain/interfaces/ICareer';
import { IStudentDetail } from '../../domain/interfaces/IStudentDetail';
import { Type } from 'class-transformer';
import { CareerDto } from './career.dto';

export class StudentDetailDto implements IStudentDetail {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CareerDto)
  career_id: ICareer;

  @IsNotEmpty()
  @IsInt()
  semester: number;
}
