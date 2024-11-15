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
  UseGuards,
} from '@nestjs/common';
import { ROLES } from 'src/common/constants/roles.enum';
import { JwtAuthGuard } from './../../../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { RoleGuard } from './../../../auth/infrastructure/guard/role/role.guard';
import { Roles } from './../../../role/infrastructure/decorator/role.decorator';
import { CauseDto } from '../dtos/cause.dto';
import { ResponseAdapter } from 'src/common/response-adapter/response.adapter';
import { CreateCauseUseCase } from '../../application/createCauseUseCase/CreateCause.useCase';
import { HTTP_RESPONSE_MESSAGE } from 'src/common/constants/http-message';
import { CauseUpdateDto } from '../dtos/cause-update.dto';
import { UpdateCauseUseCase } from '../../application/updateCauseUseCase/UpdateCause.useCase';
import { GetCauseByReasonUseCase } from '../../application/getCauseByReasonUseCase/GetCause.useCase';

@Controller('cause')
export class CauseController {
  constructor(
    @Inject('CreateCauseUseCase')
    private readonly createCauseUseCase: CreateCauseUseCase,
    @Inject('UpdateCauseUseCase')
    private readonly updateCauseUseCase: UpdateCauseUseCase,
    @Inject('GetCauseByReasonUseCase')
    private readonly getCauseByReasonUseCase: GetCauseByReasonUseCase,
  ) {}
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Post('/:id')
  async createCause(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCauseDto: CauseDto,
  ) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      this.createCauseUseCase.run(id, createCauseDto),
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Patch('/:id')
  async updateCause(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCauseDto: CauseUpdateDto,
  ) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      this.updateCauseUseCase.run(id, createCauseDto),
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Get('/:id')
  async getCause(@Param('id', ParseIntPipe) id: number) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      this.getCauseByReasonUseCase.run(id),
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }
}
