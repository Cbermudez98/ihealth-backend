import { PartialType } from '@nestjs/mapped-types';
import { DirectionDto } from './direction.dto';

export class DirectionUpdateDto extends PartialType(DirectionDto) {}
