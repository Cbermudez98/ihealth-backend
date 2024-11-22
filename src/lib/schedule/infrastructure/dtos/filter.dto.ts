import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { DAYS } from 'src/common/constants/keys';
import { IFilterSchedule } from '../../domain/interfaces/ISchedule';
import { Type } from 'class-transformer';

export class FilterScheduleDto implements IFilterSchedule {
  @IsEnum(DAYS)
  day: DAYS;

  @IsString()
  @IsDateString()
  date: string = new Date().toISOString();
}
