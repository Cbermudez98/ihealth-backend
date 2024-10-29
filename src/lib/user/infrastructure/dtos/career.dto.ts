import { IsNotEmpty, IsString } from 'class-validator';
import { ICareerCreate } from '../../domain/interfaces/ICareer';

export class CareerDto implements ICareerCreate {
  @IsNotEmpty()
  @IsString()
  name: string;
}
