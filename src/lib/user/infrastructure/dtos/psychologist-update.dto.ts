import { PartialType } from '@nestjs/mapped-types';
import { PsychologistDto } from './psychologist.dto';

export class PsychologistUpdateDto extends PartialType(PsychologistDto) {}
