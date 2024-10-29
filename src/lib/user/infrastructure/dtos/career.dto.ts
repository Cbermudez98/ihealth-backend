import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ICareer } from '../../domain/interfaces/ICareer';

export class CareerDto implements ICareer {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
