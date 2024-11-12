import { IsNotEmpty, IsNumber } from 'class-validator';
import { IRoleAssings } from '../../domain/interfaces/IRole';

export class RoleDto implements IRoleAssings {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
