import {
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUserService } from '../../domain/service/IUser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserDto } from '../../domain/interfaces/IUser';
import { MailService } from '../../../../shared/mail/mail.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailerService: MailService,
  ) {}

  async create(userDto: IUserDto): Promise<IUser> {
    let user: User | undefined;
    try {
      user = this.userRepository.create(userDto);
      user = await this.userRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException('Cannot save User', {
        description: 'Error creating user',
      });
    }
    if (!user) {
      throw new UnprocessableEntityException('User could not be created');
    }
    return user;
  }
}
