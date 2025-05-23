import { IHashProvider } from './../../../common/domain/services/IHash.service';
import { CreateUserUseCase } from '../../application/createUser/CreateUser.useCase';
import { IUserService } from '../../domain/service/IUser.service';
import { IMailerService } from './../../../common/domain/services/IMailer.service';
import { IUserCreate } from '../../domain/interfaces/IUser';

describe('User use cases test', () => {
  const service: IUserService = {
    create: jest.fn(),
  } as any;

  const serviceHash: IHashProvider = {
    compare: jest.fn(),
    encrypt: jest.fn(),
  };

  const serviceMail: IMailerService = {
    sendEmail: jest.fn(),
  };

  const createUserUseCase = new CreateUserUseCase(
    service,
    serviceHash,
    serviceMail,
  );

  const data: IUserCreate = {
    name: 'Jane',
    last_name: 'Doe',
    age: 20,
    code: 198297418712,
    gender: 'M',
    auth: {
      email: 'jane@unicolombo.edu.co',
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
        id: 1,
      },
    },
    role: {
      id: 1,
    },
  } as any;

  it('Should create User', async () => {
    await createUserUseCase.run(data);
    expect(service.create).toHaveBeenCalled();
  });
});
