import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class PsychologistDto extends OmitType(UserDto, [
  'student_detail',
  'role',
]) {}

export class PsychologistUpdateDto extends OmitType(
  PartialType(PsychologistDto),
  ['auth'],
) {}
