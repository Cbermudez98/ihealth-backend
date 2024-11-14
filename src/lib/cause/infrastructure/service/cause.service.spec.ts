import { Test, TestingModule } from '@nestjs/testing';
import { CauseService } from './cause.service';

describe('CauseService', () => {
  let service: CauseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CauseService],
    }).compile();

    service = module.get<CauseService>(CauseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
