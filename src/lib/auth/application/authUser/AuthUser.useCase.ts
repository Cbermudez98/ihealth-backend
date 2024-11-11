import { JwtService } from '@nestjs/jwt';
import { IAuth } from '../../domain/interfaces/IAuth';
import { IauthService } from '../../domain/service/iauth.service';
import { AuthDto } from '../../infrastructure/dtos/auth.dto';
import { IHashProvider } from 'src/lib/common/domain/services/IHash.service';
import { IUserService } from 'src/lib/user/domain/service/IUser.service';

export class AuthUserUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly hashProvider: IHashProvider,
    private readonly jwtService: JwtService,
    private readonly authService: IauthService,
    private readonly iauth: IAuth,
  ) {}

  async run(auth: AuthDto): Promise<IAuth> {
    const user = await this.authService.login(auth.email);

    const validateUser = await this.authService.validateUser(auth.email);
    if (!user) {
      throw new Error('User not found');
    }
  }
}
