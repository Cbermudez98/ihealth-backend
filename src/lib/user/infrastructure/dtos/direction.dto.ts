import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IDirection } from '../../domain/interfaces/IDirection';

export class DirectionDto implements IDirection {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  aditional_information: string;
}
