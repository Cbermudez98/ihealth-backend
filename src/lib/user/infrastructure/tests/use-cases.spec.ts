import { CreateUserUseCase } from '../../application/createUser/CreateUser.useCase';
import { IUserService } from '../../domain/service/IUser.service';

describe('User use cases test', () => {
  const service: IUserService = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const createUserUseCase = new CreateUserUseCase(service);

  const data = {
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
      career_id: {
        name: 'Tecnologia en desarrollo de Software',
      },
    },
  };

  it('Should create User', async () => {
    await createUserUseCase.run(data);
    expect(service.create).toHaveBeenCalled();
  });
});
