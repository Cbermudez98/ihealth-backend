import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IAuth } from '../../domain/interfaces/IAuth';

export class AuthDto implements IAuth {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
