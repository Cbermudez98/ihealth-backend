import {
  IsDate,
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { IAppointmentCreate } from '../../domain/interfaces/IAppointment';

export class AppointmentCreateDto implements IAppointmentCreate {
  @IsNumber()
  @Min(1)
  user: number;

  @IsNumber()
  @Min(1)
  psychologist: number;

  @IsNumber()
  @Min(1)
  status: number;

  @IsNumber()
  @Min(1)
  reason: number;

  @IsNumber()
  @Min(1)
  cause: number;

  @IsNumber()
  @Min(1)
  schedule: number;

  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  description: string;
}
