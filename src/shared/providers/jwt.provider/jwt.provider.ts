import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/lib/auth/domain/service/IJwt.service';

@Injectable()
export class JwtProvider implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  signToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET_KEY'),
    });
  }

  verifyToken(token: string): Record<string, any> {
    return this.jwtService.verify(token, {
      secret: this.config.get<string>('JWT_SECRET_KEY'),
    });
  }
}
