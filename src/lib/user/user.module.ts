import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './infrastructure/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/user.entity';
import { UserService } from './infrastructure/service/user.service';
import { IUserService } from './domain/service/IUser.service';
import { CreateUserUseCase } from './application/createUser/CreateUser.useCase';
import { MailModule } from 'src/shared/mail/mail.module';
import { IHashProvider } from '../common/domain/services/IHash.service';
import { IMailerService } from '../common/domain/services/IMailer.service';
import { Career } from '../career/infrastructure/entity/career.entity';
import { Role } from '../role/infrastructure/entity/role.entity';
import { UpdateUserUseCase } from './application/updateUser/UpdateUser.useCase';
import { GetUserUseCase } from './application/getUSer/GetUser.useCase';
import { Menu } from '../menu/infrastructure/entity/menu.entity';
import { GetPsychologistUseCase } from './application/getPsychologist/GetPsychologist.useCase';
import { GetAllUsersUseCase } from './application/getAllUsers/GetAllUsers.useCase';
import { SharedModule } from 'src/shared/shared.module';
import { CareerModule } from '../career/infrastructure/career.module';
import { CONSTANTS } from 'src/common/constants/constants';
import { RoleModule } from '../role/role.module';
import { Document } from './infrastructure/entity/document.entity';
import { DocumentSeeder } from 'src/seeds/document.seeder';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User, Career, Role, Menu, Document]),
    MailModule,
    forwardRef(() => SharedModule),
    forwardRef(() => CareerModule),
    forwardRef(() => RoleModule),
  ],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: CONSTANTS.USE_CASES.CREATE_USER_USE_CASE,
      useFactory: (
        userService: IUserService,
        hashProvider: IHashProvider,
        mailService: IMailerService,
      ) => new CreateUserUseCase(userService, hashProvider, mailService),
      inject: [
        CONSTANTS.PROVIDERS.USER_SERVICE,
        CONSTANTS.PROVIDERS.HASH_PROVIDER,
        CONSTANTS.PROVIDERS.MAIL_SERVICE,
      ],
    },
    {
      provide: CONSTANTS.USE_CASES.UPDATE_USER_USE_CASE,
      useFactory: (userService: IUserService, hashProvider: IHashProvider) =>
        new UpdateUserUseCase(userService, hashProvider),
      inject: [
        CONSTANTS.PROVIDERS.USER_SERVICE,
        CONSTANTS.PROVIDERS.HASH_PROVIDER,
      ],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_USER_USE_CASE,
      useFactory: (userService: IUserService) =>
        new GetUserUseCase(userService),
      inject: [CONSTANTS.PROVIDERS.USER_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_PSYCHOLOGIST_USE_CASE,
      useFactory: (userService: IUserService) =>
        new GetPsychologistUseCase(userService),
      inject: [CONSTANTS.PROVIDERS.USER_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_ALL_USER_USE_CASE,
      useFactory: (userService: IUserService) =>
        new GetAllUsersUseCase(userService),
      inject: [CONSTANTS.PROVIDERS.USER_SERVICE],
    },
    DocumentSeeder,
  ],
  exports: [CONSTANTS.PROVIDERS.USER_SERVICE],
})
export class UserModule {}
