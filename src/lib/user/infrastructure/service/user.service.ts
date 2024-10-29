import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IUserService } from '../../domain/service/IUser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserDto } from '../../domain/interfaces/IUser';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async save(newUser: Promise<IUser>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async create(UserDto: IUserDto): Promise<IUser> {
    try {
      const user = this.userRepository.create(UserDto);
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
