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
import { IRole } from '../../../role/domain/interfaces/IRole';
import { RoleService } from '../../../role/infrastructure/service/role.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly careerService: CareerService,
    private readonly roleService: RoleService,
  ) {}

  async create(userDto: IUserCreate): Promise<IUser> {
    let user: User | undefined;
    let career: Career | undefined;
    try {
      user = this.userRepository.create(userDto);
    } catch (error) {
      throw new RequestTimeoutException('Cannot create user', {
        description: 'Error creating user',
      });
    }

    try {
      career = await this.careerService.get(userDto.student_detail.career.id);
    } catch (error) {
      throw error;
    }

    let role: IRole | undefined;

    try {
      role = await this.roleService.get(userDto.role.id);
    } catch (error) {
      throw error;
    }

    try {
      user.student_detail.career = career;
      user.role = role;
      user = await this.userRepository.save(user);
    } catch (error) {
      console.log('Error', error);
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
