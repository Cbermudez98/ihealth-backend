import { Test, TestingModule } from '@nestjs/testing';
import { FooBarService } from './foo-bar.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Foo } from '../entity/foo.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';
import {
  GatewayTimeoutException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
describe('FooBarService', () => {
  let service: FooBarService;
  let repository: Repository<Foo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FooBarService,
        {
          provide: getRepositoryToken(Foo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FooBarService>(FooBarService);
    repository = module.get<Repository<Foo>>(getRepositoryToken(Foo));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get the foo', async () => {
    jest.spyOn(repository, 'findOneBy').mockReturnValue({} as any);
    const response = await service.get(1);
    expect(response).toBeTruthy();
  });

  it('Should throw an error when get the foo', async () => {
    jest.spyOn(repository, 'findOneBy').mockReturnValue(undefined as any);
    try {
      await service.get(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });

  it('Should get all the foo', async () => {
    jest.spyOn(repository, 'find').mockReturnValue([] as any);
    const response = await service.getAll();
    expect(response).toBeTruthy();
  });

  it('Should throw an error when get all the foo', async () => {
    jest.spyOn(repository, 'find').mockImplementation(() => {
      throw new Error();
    });
    try {
      await service.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(GatewayTimeoutException);
    }
  });

  it('Should set the foo', async () => {
    jest.spyOn(repository, 'create').mockReturnValue({} as any);
    jest.spyOn(repository, 'save').mockReturnValue({} as any);
    const response = await service.set({
      foo: 'Bar',
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('Should throw an error when set the foo', async () => {
    jest.spyOn(repository, 'create').mockReturnValue({} as any);
    jest.spyOn(repository, 'save').mockImplementation(() => {
      throw new Error();
    });
    try {
      await service.set({
        foo: 'Bar',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('Should update foo with the id', async () => {
    jest.spyOn(repository, 'findOneBy').mockReturnValue({} as any);
    jest.spyOn(repository, 'save').mockReturnValue({} as any);
    await service.update(1, {});
    expect(repository.save).toHaveBeenCalled();
  });

  it('Should throw an error when update foo', async () => {
    jest.spyOn(repository, 'findOneBy').mockImplementation(() => {
      throw new Error();
    });
    try {
      await service.update(1, {});
    } catch (error) {
      expect(error).toBeInstanceOf(GatewayTimeoutException);
    }
  });

  it('Should throw an error when get undefined foo', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);
    try {
      await service.update(1, {});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should throw an error when update foo', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue({} as any);
    jest.spyOn(repository, 'save').mockImplementation(() => {
      throw new Error();
    });
    try {
      await service.update(1, {});
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });
});
