import { Test, TestingModule } from '@nestjs/testing';
import { ReasonService } from './reason.service';

describe('ReasonService', () => {
  let service: ReasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReasonService],
    }).compile();

    service = module.get<ReasonService>(ReasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
