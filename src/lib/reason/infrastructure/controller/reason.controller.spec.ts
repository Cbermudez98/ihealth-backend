import { Test, TestingModule } from '@nestjs/testing';
import { ReasonController } from './reason.controller';

describe('ReasonController', () => {
  let controller: ReasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReasonController],
    }).compile();

    controller = module.get<ReasonController>(ReasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
