import { IAuthService } from '../../domain/service/IAuth.service';
import { AuthDto } from '../../infrastructure/dtos/auth.dto';
import { IHashProvider } from './../../../common/domain/services/IHash.service';
import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';
import { ForbidenError } from 'src/lib/common/domain/errors/ForbiddenError';
import { IJwtService } from '../../domain/service/IJwt.service';
import { InternalServerError } from 'src/lib/common/domain/errors/InternalServerError';
import { IAccessToken } from '../../domain/interfaces/IAccessToken';

export class AuthUserUseCase {
  constructor(
    private readonly hashProvider: IHashProvider,
    private readonly authService: IAuthService,
    private readonly jwtService: IJwtService,
  ) {}

  async run(auth: AuthDto): Promise<IAccessToken> {
    const user = await this.authService.validateUser(auth.email);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isValidPassword = this.hashProvider.compare(
      auth.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new ForbidenError('Password mismatch');
    }
    let token: string = '';
    try {
      token = this.jwtService.signToken({
        id: user.id,
        roles: 'admin',
      });
    } catch (error) {
      throw new InternalServerError('Error generating token');
    }
    return {
      access_token: `Bearer ${token}`,
    };
  }
}
