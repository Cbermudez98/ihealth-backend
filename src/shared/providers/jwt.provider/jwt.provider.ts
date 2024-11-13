import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/lib/auth/domain/service/IJwt.service';

@Injectable()
export class JwtProvider implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): Record<string, any> {
    return this.jwtService.verify(token);
  }
}
