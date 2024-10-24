import { Test, TestingModule } from '@nestjs/testing';
import { FooBarService } from './foo-bar.service';

describe('FooBarService', () => {
  let service: FooBarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FooBarService],
    }).compile();

    service = module.get<FooBarService>(FooBarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
