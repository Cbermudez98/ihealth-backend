import { Test, TestingModule } from '@nestjs/testing';
import { CareerService } from './career.service';
import { Repository } from 'typeorm';
import { Career } from '../entity/career.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';

describe('CareerService', () => {
  let service: CareerService;
  let repository: Repository<Career>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CareerService,
        {
          provide: getRepositoryToken(Career),
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<CareerService>(CareerService);
    repository = module.get<Repository<Career>>(getRepositoryToken(Career));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get the career', async () => {
    jest.spyOn(repository, 'findOneBy').mockReturnValue({} as any);
    const response = await service.get(1);
    expect(response).toBeTruthy();
  });

  it('Should throw an error when get the career', async () => {
    jest.spyOn(repository, 'findOneBy').mockReturnValue(undefined as any);
    try {
      await service.get(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });

  it('Should get all the career', async () => {
    jest.spyOn(repository, 'find').mockReturnValue([] as any);
    const response = await service.getAll();
    expect(response).toBeTruthy();
  });
});
