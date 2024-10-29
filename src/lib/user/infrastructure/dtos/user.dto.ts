import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { IAuth } from '../../domain/interfaces/IAuth';
import { IDirection } from '../../domain/interfaces/IDirection';
import { IStudentDetail } from '../../domain/interfaces/IStudentDetail';
import { IUser } from '../../domain/interfaces/IUser';
import { Type } from 'class-transformer';
import { AuthDto } from './auth.dto';
import { DirectionDto } from './direction.dto';
import { StudentDetail } from '../entity/user.entity';

export class UserDto implements IUser {
  @IsNotEmpty()
  @IsInt()
  id: number;

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
  auth: IAuth;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DirectionDto)
  direction: IDirection;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StudentDetail)
  student_detail: IStudentDetail;
}
