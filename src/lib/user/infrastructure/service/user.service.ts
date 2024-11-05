import { Injectable } from '@nestjs/common';
import { IUserService } from '../../domain/service/IUser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserDto } from '../../domain/interfaces/IUser';
import { hashPassword } from './auth.service';
import { MailService } from '../../../../shared/mail/mail.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailerService: MailService,
  ) {}

  async save(newUser: Promise<IUser>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async create(userDto: IUserDto): Promise<IUser> {
    const hashedPassword = await hashPassword(userDto.auth.password);
    const newUserData = {
      name: userDto.name,
      last_name: userDto.last_name,
      age: userDto.age,
      code: userDto.code,
      gender: userDto.gender,
      auth: {
        email: userDto.auth.email,
        password: hashedPassword,
      },
      direction: userDto.direction,
      student_detail: userDto.student_detail,
    };

    const user = this.userRepository.create(newUserData);
    const savedUser = await this.userRepository.save(user);
    // await this.mailerService.sendWelcomeEmail(user.auth.email, user.name);

    return savedUser;
  }
}
