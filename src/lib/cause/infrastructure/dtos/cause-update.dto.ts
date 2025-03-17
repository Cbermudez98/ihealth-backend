import { PartialType } from '@nestjs/mapped-types';
import { CauseDto } from './cause.dto';

export class CauseUpdateDto extends PartialType(CauseDto) {}
