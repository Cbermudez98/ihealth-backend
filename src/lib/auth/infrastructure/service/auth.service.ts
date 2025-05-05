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
    return await this.authRepository.findOne({
      where: { email },
      relations: ['user', 'user.role'],
    });
  }
}

export async function hashPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}
