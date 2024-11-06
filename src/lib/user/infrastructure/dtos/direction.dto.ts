import { IsNotEmpty, IsString } from 'class-validator';
import { IDirectionCreate } from '../../domain/interfaces/IDirection';

export class DirectionDto implements IDirectionCreate {
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
