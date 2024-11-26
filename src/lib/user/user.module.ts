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
import { Role } from '../role/infrastructure/entity/role.entity';
import { RoleService } from '../role/infrastructure/service/role.service';
import { JwtAuthGuard } from '../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';
import { UpdateUserUseCase } from './application/updateUser/UpdateUser.useCase';
import { GetUserUseCase } from './application/getUSer/GetUser.useCase';
import { Menu } from '../menu/infrastructure/entity/menu.entity';
import { GetPsycologistUseCase } from './application/getPsycologist/GetPsycologist.useCase';
import { GetAllUsersUseCase } from './application/getAllUsers/GetAllUsers.useCase';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Career, Role, Menu]), MailModule],
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
    {
      provide: 'UpdateUserUseCase',
      useFactory: (userService: IUserService, hashProvider: IHashProvider) =>
        new UpdateUserUseCase(userService, hashProvider),
      inject: ['UserService', 'HashProvider'],
    },
    {
      provide: 'GetUserUseCase',
      useFactory: (userService: IUserService) =>
        new GetUserUseCase(userService),
      inject: ['UserService'],
    },
    {
      provide: 'GetPsycologistUseCase',
      useFactory: (userService: IUserService) =>
        new GetPsycologistUseCase(userService),
      inject: ['UserService'],
    },
    {
      provide: 'GetAllUsersUseCase',
      useFactory: (userService: IUserService) =>
        new GetAllUsersUseCase(userService),
      inject: ['UserService'],
    },
    CareerService,
    RoleService,
    JwtAuthGuard,
    JwtProvider,
  ],
})
export class UserModule {}
