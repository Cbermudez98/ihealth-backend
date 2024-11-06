import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GetCareerUseCase } from '../../application/getCareer/GetCareer.useCase';
import { GetAllCareerUseCase } from '../../application/getAllCareer/GetAllCareer.useCase';
import { ResponseAdapter } from './../../../../common/response-adapter/response.adapter';
import { HTTP_RESPONSE_MESSAGE } from './../../../../common/constants/http-message';

@Controller('career')
export class CareerController {
  constructor(
    @Inject('GetAllCareerUseCase')
    private readonly getAllCareerUseCase: GetAllCareerUseCase,
    @Inject('GetCareerUseCase')
    private readonly getCareerUseCase: GetCareerUseCase,
  ) {}

  @Get()
  public async getAllCareer() {
    const response = await this.getAllCareerUseCase.run();
    return ResponseAdapter.set(
      HttpStatus.OK,
      response,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @Get('/:id')
  public async career(@Param('id', ParseIntPipe) id: number) {
    const response = await this.getCareerUseCase.run(id);
    return ResponseAdapter.set(
      HttpStatus.OK,
      response,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
