import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IAuthCreate } from '../../domain/interfaces/IAuth';

export class AuthDto implements IAuthCreate {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@unicolombo\.edu\.co$/)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
