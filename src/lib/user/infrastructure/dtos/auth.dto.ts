import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthCreate } from '../../domain/interfaces/IAuth';

export class AuthDto implements IAuthCreate {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
