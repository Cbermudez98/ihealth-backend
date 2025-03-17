import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleDto } from '../../../role/infrastructure/dtos/role.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { MenuDto } from './menu.dto';
import { Role } from '../../../role/infrastructure/entity/role.entity';

export class MenuUpdateDto extends PartialType(
  OmitType(MenuDto, ['name', 'icon', 'roles', 'route']),
) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  route: string;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: Role[];
}
