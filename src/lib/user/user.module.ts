import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/user.entity';
import { UserService } from './infrastructure/service/user.service';
import { IUserService } from './domain/service/IUser.service';
import { CreateUserUseCase } from './application/createUser/CreateUser.useCase';
import { MailModule } from 'src/shared/mail/mail.module';
import { HashProvider } from 'src/shared/providers/hash.provider/hash.provider';
import { MailService } from 'src/shared/mail/mail.service';
import { IHashProvider } from '../common/domain/services/IHash.service';
import { IMailerService } from '../common/domain/services/IMailer.service';
import { CareerService } from '../career/infrastructure/service/career.service';
import { Career } from '../career/infrastructure/entity/career.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Career]), MailModule],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
    {
      provide: 'MailService',
      useClass: MailService,
    },
    {
      provide: 'CreateUserUseCase',
      useFactory: (
        userService: IUserService,
        hashProvider: IHashProvider,
        mailService: IMailerService,
      ) => new CreateUserUseCase(userService, hashProvider, mailService),
      inject: ['UserService', 'HashProvider', 'MailService'],
    },
    CareerService,
  ],
})
export class UserModule {}
