import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RoleService', () => {
  let service: RoleService;
  let repository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
