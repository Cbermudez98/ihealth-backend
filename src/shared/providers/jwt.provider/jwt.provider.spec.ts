import { Test, TestingModule } from '@nestjs/testing';
import { JwtProvider } from './jwt.provider';
import { JwtService } from '@nestjs/jwt';

describe('JwtProvider', () => {
  let provider: JwtProvider;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtProvider, JwtService],
    }).compile();

    provider = module.get<JwtProvider>(JwtProvider);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
