import { IsNotEmpty, IsString } from 'class-validator';
import { IReasonCreate } from '../../domain/interfaces/IReason';

export class ReasonCreateDto implements IReasonCreate {
  @IsNotEmpty()
  @IsString()
  name: string;
}
