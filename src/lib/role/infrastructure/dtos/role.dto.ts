import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { IRoleAssign } from './../../domain/interfaces/IRole';
import { Menu } from '../../../../lib/menu/infrastructure/entity/menu.entity';
import { MenuDto } from '../../../../lib/menu/infrastructure/dtos/menu.dto';
import { Type } from 'class-transformer';

export class RoleDto implements IRoleAssign {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
