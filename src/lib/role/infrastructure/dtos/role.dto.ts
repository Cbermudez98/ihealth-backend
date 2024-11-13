import { IsNotEmpty, IsNumber } from 'class-validator';
import { IRoleAssign } from './../../domain/interfaces/IRole';

export class RoleDto implements IRoleAssign {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
