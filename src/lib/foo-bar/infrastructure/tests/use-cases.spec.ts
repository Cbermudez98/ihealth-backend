import { GetAllFooBarUseCase } from '../../application/getAllFooBar/GetAllFooBar.useCase';
import { GetFooBarUseCase } from '../../application/getFooBar/GetFooBar.useCase';
import { SetFooBarUseCase } from '../../application/setFooBar/SetFooBar.useCase';
import { UpdateFooBarUseCase } from '../../application/updateFooBat/UpdateFooBar.useCase';
import { IFooBarService } from '../../domain/service/IFooBar.service';

describe('Foo bar use cases test', () => {
  const service: IFooBarService = {
    get: jest.fn(() => {
      return {} as any;
    }),
    getAll: jest.fn(() => {
      return [] as any;
    }),
    set: jest.fn(),
    update: jest.fn(),
  };
  const getAllFooBarUseCase = new GetAllFooBarUseCase(service);
  const getFooBarUseCase = new GetFooBarUseCase(service);
  const setFooBarUseCase = new SetFooBarUseCase(service);
  const updateFooBarUseCase = new UpdateFooBarUseCase(service);

  it('Should get all foo bar', async () => {
    const response = await getAllFooBarUseCase.run();
    expect(response).toBeDefined();
  });

  it('Should get foo bar', async () => {
    const response = await getFooBarUseCase.run(1);
    expect(response).toBeDefined();
  });

  it('Should set foo bar', async () => {
    await setFooBarUseCase.run({
      foo: 'bar',
    });
    expect(service.set).toHaveBeenCalled();
  });

  it('Should update foo bar', async () => {
    await updateFooBarUseCase.run(1, {
      foo: 'bar',
    });
    expect(service.update).toHaveBeenCalled();
  });
});
