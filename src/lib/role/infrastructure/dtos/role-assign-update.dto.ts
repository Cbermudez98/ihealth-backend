import { PartialType } from '@nestjs/mapped-types';
import { RoleDto } from './role.dto';

export class RoleAssignUpdateDto extends PartialType(RoleDto) {}
