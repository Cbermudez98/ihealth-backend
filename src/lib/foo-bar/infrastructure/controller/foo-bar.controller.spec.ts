import { Test, TestingModule } from '@nestjs/testing';
import { FooBarController } from './foo-bar.controller';
import { FooBarService } from '../service/foo-bar.service';
import { IFooBarService } from '../../domain/service/IFooBar.service';
import { GetFooBarUseCase } from '../../application/getFooBar/GetFooBar.useCase';
import { GetAllFooBarUseCase } from '../../application/getAllFooBar/GetAllFooBar.useCase';
import { SetFooBarUseCase } from '../../application/setFooBar/SetFooBar.useCase';
import { UpdateFooBarUseCase } from '../../application/updateFooBat/UpdateFooBar.useCase';
import { Foo } from '../entity/foo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';

describe('FooBarController', () => {
  let controller: FooBarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FooBarController],
      providers: [
        {
          provide: 'GetFooBarUseCase',
          useValue: { run: jest.fn().mockReturnValue({}) },
        },
        { provide: 'SetFooBarUseCase', useValue: { run: jest.fn() } },
        { provide: 'UpdateFooBarUseCase', useValue: { run: jest.fn() } },
        { provide: 'GetAllFooBarUseCase', useValue: { run: jest.fn() } },
      ],
    }).compile();

    controller = module.get<FooBarController>(FooBarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should call GetFooBarUseCase successfully', async () => {
    const response = await controller.foo(1);
    expect(response.code).toBe(HttpStatus.OK);
  });

  it('Should call GetAllFooBarUseCase successfully', async () => {
    const response = await controller.getAllFoo();
    expect(response.code).toBe(HttpStatus.OK);
  });

  it('Should call SetFooBarUseCase successfully', async () => {
    const response = await controller.setFoo({
      foo: 'Hello world',
    });
    expect(response.code).toBe(HttpStatus.CREATED);
  });

  it('Should call UpdateFooBarUseCase successfully', async () => {
    const response = await controller.updateFoo(1, {
      foo: 'Hello world',
    });
    expect(response.code).toBe(HttpStatus.OK);
  });
});
