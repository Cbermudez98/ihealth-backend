import { Test, TestingModule } from '@nestjs/testing';
import { IcsProvider } from './ics.provider';

describe('IcsProvider', () => {
  let provider: IcsProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcsProvider],
    }).compile();

    provider = module.get<IcsProvider>(IcsProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
