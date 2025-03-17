import { PartialType } from '@nestjs/mapped-types';
import { ReasonCreateDto } from './reason.dto';

export class ReasonUpdateDto extends PartialType(ReasonCreateDto) {}
