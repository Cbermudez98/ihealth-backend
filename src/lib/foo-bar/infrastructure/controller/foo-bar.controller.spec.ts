import { Test, TestingModule } from '@nestjs/testing';
import { FooBarController } from './foo-bar.controller';

describe('FooBarController', () => {
  let controller: FooBarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FooBarController],
    }).compile();

    controller = module.get<FooBarController>(FooBarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });





  
});
