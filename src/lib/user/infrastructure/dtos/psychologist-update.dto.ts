import { OmitType, PartialType } from '@nestjs/mapped-types';
import { AuthDto } from '../../../auth/infrastructure/dtos/auth.dto';

export class UpdateAuthDto extends OmitType(PartialType(AuthDto), [
  'email',
  'password',
]) {}
