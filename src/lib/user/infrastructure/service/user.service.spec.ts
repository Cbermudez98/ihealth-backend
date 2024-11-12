import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IUserCreate, IUserDto } from '../../domain/interfaces/IUser';
import { RequestTimeoutException } from '@nestjs/common';
import { MailService } from '../../../../shared/mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CareerService } from '../../../career/infrastructure/service/career.service';
import { Career } from '../../../career/infrastructure/entity/career.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let repositoryCarrer: Repository<Career>;
  let mailService: MailService;
  let carrerService: CareerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        CareerService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Career),
          useClass: Repository,
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    carrerService = module.get<CareerService>(CareerService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    repositoryCarrer = module.get<Repository<User>>(getRepositoryToken(Career));
    mailService = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const userDto: IUserCreate = {
    name: 'Jane',
    last_name: 'Doe',
    age: 20,
    code: 198297418712,
    gender: 'M',
    auth: {
      email: 'rawad.munosromero@unicolombo.edu.co',
      password: 'Jane123*',
    },
    direction: {
      neighborhood: 'El pozon',
      street: '39B',
      number: '#29-198',
      aditional_information: 'El pozon cll 39B #29-198 apto 504',
    },
    student_detail: {
      semester: 7,
      career: {
        id: 0,
      },
    },
  };

  const data: IUserCreate = {
    name: 'Jane',
    last_name: 'Doe',
    age: 20,
    code: 198297418712,
    gender: 'M',
    auth: {
      email: 'rawad.munosromero@unicolombo.edu.co',
      password: '1234567890',
    },
    direction: {
      neighborhood: 'El pozon',
      street: '39B',
      number: '#29-198',
      aditional_information: 'El pozon cll 39B #29-198 apto 504',
    },
    student_detail: {
      semester: 7,
      career: {
        id: 1,
      },
    },
  };

  it('should create a user and send welcome email', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(data as User);
    jest.spyOn(repository, 'save').mockResolvedValue(data as User);
    jest.spyOn(carrerService, 'get').mockResolvedValue({} as Career);
    const response = await service.create(userDto);

    expect(response).toEqual(data);
  });

  it('should throw an error if user creation fails', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(userDto as User);
    jest.spyOn(carrerService, 'get').mockResolvedValue({} as Career);

    await expect(service.create(userDto)).rejects.toThrow(
      RequestTimeoutException,
    );
  });
});
