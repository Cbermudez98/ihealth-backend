import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { IAuth, IAuthCreate } from '../../domain/interfaces/IAuth';
import {
  IDirection,
  IDirectionCreate,
} from '../../domain/interfaces/IDirection';
import {
  IStudentDetail,
  IStudentDetailCreate,
} from '../../domain/interfaces/IStudentDetail';
import { IUser, IUserCreate } from '../../domain/interfaces/IUser';
import { Type } from 'class-transformer';
import { AuthDto } from './auth.dto';
import { DirectionDto } from './direction.dto';
import { StudentDetailDto } from './student-detail.dto';

export class UserDto implements IUserCreate {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AuthDto)
  auth: IAuthCreate;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DirectionDto)
  direction: IDirectionCreate;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StudentDetailDto)
  student_detail: IStudentDetailCreate;
}
