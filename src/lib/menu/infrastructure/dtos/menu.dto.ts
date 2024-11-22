import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IMenuDto } from '../../domain/interfaces/IMenu';
import { Role } from '../../../role/infrastructure/entity/role.entity';
import { Type } from 'class-transformer';
import { RoleDto } from 'src/lib/role/infrastructure/dtos/role.dto';

export class MenuDto implements IMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  route: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: Role[];
}
