import { Test, TestingModule } from '@nestjs/testing';
import { CareerController } from './career.controller';
import { HttpStatus } from '@nestjs/common';

describe('CareerController', () => {
  let controller: CareerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerController],
      providers: [
        {
          provide: 'GetCareerUseCase',
          useValue: { run: jest.fn().mockReturnValue({}) },
        },
        {
          provide: 'GetAllCareerUseCase',
          useValue: { run: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CareerController>(CareerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should call GetCareerUseCase successfully', async () => {
    const response = await controller.career(1);
    expect(response.code).toBe(HttpStatus.OK);
  });

  it('Should call GetAllCareerUseCase successfully', async () => {
    const response = await controller.getAllCareer();
    expect(response.code).toBe(HttpStatus.OK);
  });
});
