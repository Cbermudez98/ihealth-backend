import { Test, TestingModule } from '@nestjs/testing';
import { HashProvider } from './hash.provider';

describe('HashProvider', () => {
  let provider: HashProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashProvider],
    }).compile();

    provider = module.get<HashProvider>(HashProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
