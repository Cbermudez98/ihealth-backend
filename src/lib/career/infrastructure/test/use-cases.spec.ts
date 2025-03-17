import { GetAllCareerUseCase } from '../../application/getAllCareer/GetAllCareer.useCase';
import { GetCareerUseCase } from '../../application/getCareer/GetCareer.useCase';
import { ICareerService } from '../../domain/service/ICareer.service';

describe('Foo bar use cases test', () => {
  const service: ICareerService = {
    get: jest.fn(() => {
      return {} as any;
    }),
    getAll: jest.fn(() => {
      return [] as any;
    }),
  };
  const getAllCareerUseCase = new GetAllCareerUseCase(service);
  const getCareerUseCase = new GetCareerUseCase(service);

  it('Should get all careers', async () => {
    const response = await getAllCareerUseCase.run();
    expect(response).toBeDefined();
  });

  it('Should get career', async () => {
    const response = await getCareerUseCase.run(1);
    expect(response).toBeDefined();
  });
});
