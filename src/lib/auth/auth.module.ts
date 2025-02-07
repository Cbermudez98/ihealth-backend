import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './infrastructure/entity/auth.entity';
import { IHashProvider } from '../common/domain/services/IHash.service';
import { IAuthService } from './domain/service/IAuth.service';
import { AuthUserUseCase } from './application/authUser/AuthUser.useCase';
import { AuthController } from './infrastructure/controller/auth.controller';
import { IJwtService } from './domain/service/IJwt.service';
import { SharedModule } from 'src/shared/shared.module';
import { CONSTANTS } from 'src/common/constants/constants';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Auth]), SharedModule],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: CONSTANTS.USE_CASES.AUTH_USER_USE_CASE,
      useFactory: (
        hashProvider: IHashProvider,
        authService: IAuthService,
        jwtProvide: IJwtService,
      ) => new AuthUserUseCase(hashProvider, authService, jwtProvide),
      inject: [
        CONSTANTS.PROVIDERS.HASH_PROVIDER,
        CONSTANTS.PROVIDERS.AUTH_SERVICE,
        CONSTANTS.PROVIDERS.JWT_SERVICE,
      ],
    },
  ],
})
export class AuthModule {}
