import { IAuthService } from '../../domain/service/IAuth.service';
import { AuthDto } from '../../infrastructure/dtos/auth.dto';
import { IHashProvider } from './../../../common/domain/services/IHash.service';
import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';
import { ForbiddenError } from 'src/lib/common/domain/errors/ForbiddenError';
import { IJwtService } from '../../domain/service/IJwt.service';
import { InternalServerError } from 'src/lib/common/domain/errors/InternalServerError';
import { IAccessToken } from '../../domain/interfaces/IAccessToken';
import { IAuth } from '../../domain/interfaces/IAuth';

export class AuthUserUseCase {
  constructor(
    private readonly hashProvider: IHashProvider,
    private readonly authService: IAuthService,
    private readonly jwtService: IJwtService,
  ) {}

  async run(auth: AuthDto): Promise<IAccessToken> {
    const userAuth: IAuth = await this.authService.validateUser(auth.email);
    if (!userAuth) {
      throw new NotFoundError('User not found');
    }
    const isValidPassword = this.hashProvider.compare(
      auth.password,
      userAuth.password,
    );
    if (!isValidPassword) {
      throw new ForbiddenError('Password mismatch');
    }
    let token: string = '';
    console.log('Role', userAuth.user.role);
    try {
      token = this.jwtService.signToken({
        id: userAuth.id,
        role: userAuth.user.role.name,
      });
    } catch (error) {
      throw new InternalServerError('Error generating token');
    }
    return {
      access_token: `Bearer ${token}`,
    };
  }
}
