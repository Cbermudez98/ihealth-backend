import { PartialType } from '@nestjs/mapped-types';
import { StudentDetailDto } from './student-detail.dto';

export class StudentDetailUpdateDto extends PartialType(StudentDetailDto) {}
