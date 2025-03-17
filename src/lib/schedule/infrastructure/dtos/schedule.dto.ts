import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { IScheduleCreate } from '../../domain/interfaces/ISchedule';

export class CreateScheduleDto implements IScheduleCreate {
  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;
}
