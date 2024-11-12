import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IAuthService } from '../../domain/service/IAuth.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entity/auth.entity';
import { Repository } from 'typeorm';
import { IAuth } from '../../domain/interfaces/IAuth';
import { NotFoundError } from '../../../common/domain/errors/NotFoundErrors';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  async validateUser(email: string): Promise<IAuth> {
    try {
      await this.getAuth(email);
    } catch (error) {
      console.log('error', error);
    }
    return await this.authRepository.findOneBy({ email });
  }

  async getAuth(email: string) {
    const user = await this.authRepository.findOne({
      where: {
        email,
      },
      relations: ['user'],
    });
    console.log(user);
  }

  login: (id: any) => Promise<{ access_token: string }>;
  // async login(user: any) {
  //   const payload = { username: user.email, sub: user.password };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}

export async function hashPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}
