import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IUserDto } from '../../domain/interfaces/IUser';
import { UnprocessableEntityException } from '@nestjs/common';
import { MailService } from '../../../../shared/mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
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
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    mailService = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const userDto: IUserDto = {
    name: 'Jane',
    last_name: 'Doe',
    age: 20,
    code: 198297418712,
    gender: 'M',
    auth: {
      email: 'santiago.lopezmarmolejo@unicolombo.edu.co',
      password: 'Jane123*',
      id: 0,
    },
    direction: {
      neighborhood: 'El pozon',
      street: '39B',
      number: '#29-198',
      aditional_information: 'El pozon cll 39B #29-198 apto 504',
      id: 0,
    },
    student_detail: {
      semester: 7,
      career_id: {
        name: 'Tecnologia en desarrollo de Software',
        id: 0,
      },
      id: 0,
    },
  };

  const data = {
    name: 'Jane',
    last_name: 'Doe',
    age: 20,
    code: 198297418712,
    gender: 'M',
    auth: {
      email: 'santiago.lopezmarmolejo@unicolombo.edu.co',
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
      career_id: {
        name: 'Tecnologia en desarrollo de Software',
      },
    },
  };

  it('should create a user and send welcome email', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(data as User);
    jest.spyOn(repository, 'save').mockResolvedValue(data as User);
    jest.spyOn(mailService, 'sendEmail').mockResolvedValue(true);

    const response = await service.create(userDto);

    expect(response).toEqual(data);
  });

  it('should throw an error if user creation fails', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(userDto as User);
    jest.spyOn(repository, 'save').mockImplementation(() => {
      throw new UnprocessableEntityException('Failed to save user');
    });

    await expect(service.create(userDto)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
});
