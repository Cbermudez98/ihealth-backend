import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUserService } from '../../domain/service/IUser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { In, Repository } from 'typeorm';
import { IUser, IUserCreate, IUserUpdate } from '../../domain/interfaces/IUser';
import { CareerService } from '../../../career/infrastructure/service/career.service';
import { Career } from '../../../career/infrastructure/entity/career.entity';
import { IRole } from '../../../role/domain/interfaces/IRole';
import { RoleService } from '../../../role/infrastructure/service/role.service';
import { ROLES } from '../../../../common/constants/roles.enum';
import { name } from 'ejs';
import { CONSTANTS } from '../../../../common/constants/constants';
import { Document } from '../entity/document.entity';
import { IDocumentBase } from '../../domain/interfaces/IDocument';
import { IPsychologistCreate } from '../../domain/interfaces/IPsychologist';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CONSTANTS.PROVIDERS.CAREER_SERVICE)
    private readonly careerService: CareerService,
    @Inject(CONSTANTS.PROVIDERS.ROLE_SERVICE)
    private readonly roleService: RoleService,
  ) {}

  async create(userDto: IUserCreate): Promise<IUser> {
    // console.log('🚀  ~ UserService ~ create ~ userDto:', userDto);
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

    let document: Document | undefined;

    document = await this.documentRepository.findOne({
      where: { id: userDto.document.id },
    });
    if (!document) {
      throw new UnprocessableEntityException('Document not found');
    }
    console.log(document);

    user.document = document;
    console.log(user);

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
      console.log('Error at line 109 user.service.ts', error);
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
          auth: true,
          appointments: false,
          direction: true,
          student_detail: false,
          role: true,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Could not get psycologist');
    }
  }

  async getAll(): Promise<IUser[]> {
    try {
      return await this.userRepository.find({
        where: {
          role: {
            name: In([ROLES.USER]),
          },
        },
        relations: {
          auth: true,
          appointments: false,
          direction: false,
          student_detail: {
            career: true,
          },
          role: true,
        },
        select: {
          id: true,
          name: true,
          last_name: true,
          code: true,
          auth: {
            email: true,
          },
          student_detail: {
            id: true,
            semester: false,
            career: {
              name: true,
            },
          },
          role: {
            name: true,
          },
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Could not get all Users');
    }
  }

  async getDocuments(): Promise<IDocumentBase[]> {
    return await this.documentRepository.find();
  }

  async createPsychologist(userDto: IPsychologistCreate): Promise<IUser> {
    let user: User;
    try {
      user = this.userRepository.create(userDto);
    } catch (error) {
      throw new RequestTimeoutException('Cannot create psychologist');
    }

    const document = await this.documentRepository.findOne({
      where: { id: userDto.document.id },
    });

    if (!document) {
      throw new UnprocessableEntityException('Document not found');
    }
    const role = await this.roleService.getByName(ROLES.COORDINATOR);

    user.role = role;
    user.document = document;

    try {
      user = await this.userRepository.save(user);
    } catch (error) {
      console.log(error);

      throw new RequestTimeoutException('Error saving psychologist');
    }

    return user;
  }
}
