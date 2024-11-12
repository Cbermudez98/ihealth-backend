import { Test, TestingModule } from '@nestjs/testing';
import { JwtProvider } from './jwt.provider';

describe('JwtProvider', () => {
  let provider: JwtProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtProvider],
    }).compile();

    provider = module.get<JwtProvider>(JwtProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
