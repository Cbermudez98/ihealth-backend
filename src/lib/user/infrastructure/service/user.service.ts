import {
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUserService } from '../../domain/service/IUser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserCreate, IUserUpdate } from '../../domain/interfaces/IUser';
import { CareerService } from '../../../career/infrastructure/service/career.service';
import { Career } from '../../../career/infrastructure/entity/career.entity';
import { IRole } from '../../../role/domain/interfaces/IRole';
import { RoleService } from '../../../role/infrastructure/service/role.service';
import { ROLES } from 'src/common/constants/roles.enum';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly careerService: CareerService,
    private readonly roleService: RoleService,
  ) {}

  async create(userDto: IUserCreate): Promise<IUser> {
    console.log('🚀  ~ UserService ~ create ~ userDto:', userDto);
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
    console.log('Created with success');
    return user;
  }

  async get(id: IUser['id']): Promise<IUser> {
    let user: IUser | undefined;

    try {
      user = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: {
          role: true,
          student_detail: {
            career: true,
          },
          direction: true,
          auth: true,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Error querying user');
    }
    return user;
  }

  async update(id: IUser['id'], userToUpdate: IUserUpdate): Promise<boolean> {
    const user = await this.get(id);

    try {
      userToUpdate.auth = userToUpdate?.auth
        ? {
            ...user.auth,
            email: userToUpdate?.auth?.email || user.auth.email,
            password: userToUpdate?.auth?.password || user.auth.password,
          }
        : user.auth;
      userToUpdate.role = userToUpdate?.role
        ? {
            id: userToUpdate?.role?.id ?? user.role?.id,
          }
        : user?.role;
      userToUpdate.student_detail = userToUpdate.student_detail
        ? {
            ...user.student_detail,
            career:
              userToUpdate?.student_detail?.career ??
              user.student_detail.career,
            semester:
              userToUpdate?.student_detail?.semester ??
              user.student_detail.semester,
          }
        : user.student_detail;
      userToUpdate.direction = userToUpdate?.direction
        ? {
            ...user.direction,
            ...userToUpdate.direction,
          }
        : user.direction;
      console.log('userToUpdate', userToUpdate);
      await this.userRepository.save({
        ...user,
        ...userToUpdate,
      });
    } catch (error) {
      throw new RequestTimeoutException('Error updating user');
    }
    return true;
  }

  async getPsychologist(): Promise<IUser[]> {
    try {
      return await this.userRepository.find({
        where: {
          role: {
            name: ROLES.COORDINATOR,
          },
        },
        relations: {
          auth: false,
          appointments: false,
          direction: false,
          student_detail: false,
          role: false,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Could not get psycologist');
    }
  }
}
