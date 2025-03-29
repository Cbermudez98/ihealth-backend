import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IAuthCreate } from '../../../auth/domain/interfaces/IAuth';
import { IDirectionCreate } from '../../domain/interfaces/IDirection';
import { IStudentDetailCreate } from '../../domain/interfaces/IStudentDetail';
import { IUserCreate } from '../../domain/interfaces/IUser';
import { Type } from 'class-transformer';
import { AuthDto } from '../../../auth/infrastructure/dtos/auth.dto';
import { DirectionDto } from './direction.dto';
import { StudentDetailDto } from './student-detail.dto';
import { IRoleAssign } from '../../../role/domain/interfaces/IRole';
import { RoleDto } from '../../../role/infrastructure/dtos/role.dto';
import { IDocumentUser } from '../../domain/interfaces/IDocument';
import { DocumentDto } from './document.dto';

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
  @IsInt()
  code: number;

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
  @IsString()
  document_number: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StudentDetailDto)
  student_detail: IStudentDetailCreate;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RoleDto)
  role: IRoleAssign;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DocumentDto)
  document: IDocumentUser;
}
