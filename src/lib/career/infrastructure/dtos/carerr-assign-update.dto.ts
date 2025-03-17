import { PartialType } from '@nestjs/mapped-types';
import { CareerDto } from './career.dto';

export class CareerAssignUpdateDto extends PartialType(CareerDto) {}
