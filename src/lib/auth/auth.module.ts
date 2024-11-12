import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './infrastructure/service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './infrastructure/entity/auth.entity';
import { IHashProvider } from '../common/domain/services/IHash.service';
import { IAuthService } from './domain/service/IAuth.service';
import { AuthUserUseCase } from './application/authUser/AuthUser.useCase';
import { HashProvider } from 'src/shared/providers/hash.provider/hash.provider';
import { AuthController } from './infrastructure/controller/auth.controller';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';
import { IJwtService } from './domain/service/IJwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Auth]), UserModule],
  providers: [
    // JwtService,
    {
      provide: 'IHashProvider',
      useClass: HashProvider,
    },
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IJwtService',
      useClass: JwtProvider,
    },
    {
      provide: 'AuthUserUseCase',
      useFactory: (
        hashProvider: IHashProvider,
        authService: IAuthService,
        jwtProvide: IJwtService,
      ) => new AuthUserUseCase(hashProvider, authService, jwtProvide),
      inject: ['IHashProvider', 'IAuthService', 'IJwtService'],
    },
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
