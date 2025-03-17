import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { AuthUpdateDto } from 'src/lib/auth/infrastructure/dtos/auth-update.dto';
import { IAuthUpdateDto } from 'src/lib/auth/domain/interfaces/IAuth';
import { Type } from 'class-transformer';
import { DirectionUpdateDto } from './direction-update.dto';
import { IDirectionUpdate } from '../../domain/interfaces/IDirection';
import { StudentDetailUpdateDto } from './student-detail-update.dto';
import { IStudentDetailUpdateDto } from '../../domain/interfaces/IStudentDetail';
import { RoleAssignUpdateDto } from 'src/lib/role/infrastructure/dtos/role-assign-update.dto';
import { IRoleAssignUpdate } from 'src/lib/role/domain/interfaces/IRole';

export class UserUpdateDto extends PartialType(
  OmitType(UserDto, ['student_detail', 'role', 'auth', 'direction'] as const),
) {
  @IsOptional()
  @ValidateNested()
  @Type(() => AuthUpdateDto)
  auth: IAuthUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DirectionUpdateDto)
  direction: IDirectionUpdate;

  @IsOptional()
  @ValidateNested()
  @Type(() => StudentDetailUpdateDto)
  student_detail: IStudentDetailUpdateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RoleAssignUpdateDto)
  role: IRoleAssignUpdate;
}
