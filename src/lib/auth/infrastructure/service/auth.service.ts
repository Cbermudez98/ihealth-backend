import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IauthService } from '../../domain/service/iauth.service';
import { JwtService } from '@nestjs/jwt';
import { IAuth, IAuthCreate, IAuthDto } from '../../domain/interfaces/IAuth';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entity/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private iauthService: IauthService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findOneBy({ email });
    if (!user) {
      return false;
    }
    //const hashedPassword = await hashPassword(password);
    return bcrypt.compare(password, user.password);
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export async function hashPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}
