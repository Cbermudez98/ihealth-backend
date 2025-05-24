import { GetPsychologistUseCase } from './GetPsychologist.useCase';
import { IUserService } from '../../domain/service/IUser.service';
import { IUser } from '../../domain/interfaces/IUser';

describe('GetPsychologistUseCase', () => {
  let getPsychologistUseCase: GetPsychologistUseCase;
  let userService: jest.Mocked<IUserService>;

  beforeEach(() => {
    userService = {
      getPsychologist: jest.fn(),
    } as unknown as jest.Mocked<IUserService>;

    getPsychologistUseCase = new GetPsychologistUseCase(userService);
  });

  it('should call userService.getPsychologist and return data', async () => {
    const fakeData: IUser[] = [
      {
        id: 1,
        name: 'John Doe',
        last_name: '',
        age: 0,
        code: 0,
        gender: '',
        auth: undefined,
        direction: undefined,
        student_detail: undefined,
        role: undefined,
        appointments: [],
        document: undefined,
        document_number: '',
      },
    ];
    userService.getPsychologist.mockResolvedValue(fakeData);

    const result = await getPsychologistUseCase.run();

    expect(userService.getPsychologist).toHaveBeenCalled();
    expect(result).toEqual(fakeData);
  });
});
