import { IsNotEmpty, IsString } from 'class-validator';
import { ICauseCreate } from '../../domain/interfaces/ICause';

export class CauseDto implements ICauseCreate {
  @IsNotEmpty()
  @IsString()
  name: string;
}
