import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONSTANTS } from 'src/common/constants/constants';
import { IJwtService } from 'src/lib/auth/domain/service/IJwt.service';

@Injectable()
export class JwtProvider implements IJwtService {
  constructor(
    @Inject(CONSTANTS.PROVIDERS.JWT_SERVICE)
    private readonly jwtService: JwtService,
  ) {}

  signToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): Record<string, any> {
    return this.jwtService.verify(token);
  }
}
