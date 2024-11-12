import {
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUserService } from '../../domain/service/IUser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserCreate, IUserDto } from '../../domain/interfaces/IUser';
import { CareerService } from '../../../career/infrastructure/service/career.service';
import { Career } from '../../../career/infrastructure/entity/career.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly carrerService: CareerService,
  ) {}

  async create(userDto: IUserCreate): Promise<IUser> {
    let user: User | undefined;
    let carrer: Career | undefined;
    try {
      user = this.userRepository.create(userDto);
    } catch (error) {
      throw new RequestTimeoutException('Cannot create user', {
        description: 'Error creating user',
      });
    }

    try {
      carrer = await this.carrerService.get(userDto.student_detail.career.id);
    } catch (error) {
      throw error;
    }

    try {
      user.student_detail.career = carrer;
      user = await this.userRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException('Cannot save user', {
        description: 'Error saving user',
      });
    }
    if (!user) {
      throw new UnprocessableEntityException('User could not be created');
    }
    return user;
  }
}
