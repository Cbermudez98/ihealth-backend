import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/user.entity';
import { UserService } from './infrastructure/service/user.service';
import { IUserService } from './domain/service/IUser.service';
import { CreateUserUseCase } from './application/createUser/CreateUser.useCase';
import { MailModule } from 'src/shared/mail/mail.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: 'CreateUserUseCase',
      useFactory: (service: IUserService) => new CreateUserUseCase(service),
      inject: ['UserService'],
    },
  ],
})
export class UserModule {}
