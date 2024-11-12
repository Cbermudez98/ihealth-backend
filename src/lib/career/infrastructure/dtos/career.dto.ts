import { IsNotEmpty, IsNumber } from 'class-validator';
import { ICarrerAssing } from '../../domain/interfaces/ICareer';

export class CareerDto implements ICarrerAssing {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
