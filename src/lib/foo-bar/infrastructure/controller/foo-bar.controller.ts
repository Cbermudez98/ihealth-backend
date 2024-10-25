import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GetFooBarUseCase } from '../../application/getFooBar/GetFooBar.useCase';
import { FooBarDto } from '../dtos/foo-bar.dto';
import { SetFooBarUseCase } from '../../application/setFooBar/SetFooBar.useCase';
import { ResponseAdapter } from './../../../../common/response-adapter/response.adapter';
import { HTTP_RESPONSE_MESSAGE } from './../../../../common/constants/http-message';
import { UpdateFooBarUseCase } from '../../application/updateFooBat/UpdateFooBar.useCase';
import { UpdateFooBarDto } from '../dtos/foo-bar-update.dto';
import { GetAllFooBarUseCase } from '../../application/getAllFooBar/GetAllFooBar.useCase';

@Controller('foo-bar')
export class FooBarController {
  constructor(
    @Inject('GetFooBarUseCase')
    private readonly getFooBarUseCase: GetFooBarUseCase,
    @Inject('SetFooBarUseCase')
    private readonly setFooBarUseCase: SetFooBarUseCase,
    @Inject('UpdateFooBarUseCase')
    private readonly updateFooBarUseCase: UpdateFooBarUseCase,
    @Inject('GetAllFooBarUseCase')
    private readonly getAllFooBarUseCase: GetAllFooBarUseCase,
  ) {}

  @Get()
  public async getAllFoo() {
    const response = await this.getAllFooBarUseCase.run();
    return ResponseAdapter.set(
      HttpStatus.OK,
      response,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @Get('/:id')
  public async foo(@Param('id', ParseIntPipe) id: number) {
    const response = await this.getFooBarUseCase.run(id);
    return ResponseAdapter.set(
      HttpStatus.OK,
      response,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @Post()
  public async setFoo(@Body() fooBarDto: FooBarDto) {
    await this.setFooBarUseCase.run(fooBarDto);
    return ResponseAdapter.set(
      HttpStatus.CREATED,
      null,
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @Patch('/:id')
  public async updateFoo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFooBarDto: UpdateFooBarDto,
  ) {
    await this.updateFooBarUseCase.run(id, updateFooBarDto);
    return ResponseAdapter.set(
      HttpStatus.OK,
      null,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
