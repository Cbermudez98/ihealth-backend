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
import { ResponseAdapter } from '../../../../common/response-adapter/response.adapter';
import { GetReasonsUseCase } from '../../application/getReasons/GetReasons.useCase';
import { HTTP_RESPONSE_MESSAGE } from './../../../../common/constants/http-message';
import { GetReasonUseCase } from '../../application/getReason/GetReason.useCase';
import { CreateReasonUseCase } from '../../application/createReason/CreateReason.useCase';
import { ReasonCreateDto } from '../dtos/reason.dto';
import { ReasonUpdateDto } from '../dtos/reason-update.dto';
import { UpdateReasonUseCase } from '../../application/updateReason/UpdateReason.useCase';
import { JwtAuthGuard } from './../../../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { RoleGuard } from './../../..//auth/infrastructure/guard/role/role.guard';
import { ROLES } from '../../../../common/constants/roles.enum';
import { Roles } from './../../../role/infrastructure/decorator/role.decorator';
import { CONSTANTS } from 'src/common/constants/constants';

@Controller('reason')
export class ReasonController {
  constructor(
    @Inject(CONSTANTS.USE_CASES.GET_REASONS_USE_CASE)
    private readonly getReasonsUseCase: GetReasonsUseCase,

    @Inject(CONSTANTS.USE_CASES.GET_REASON_USE_CASE)
    private readonly getReasonUseCase: GetReasonUseCase,

    @Inject(CONSTANTS.USE_CASES.CREATE_REASON_USE_CASE)
    private readonly createReasonUseCase: CreateReasonUseCase,

    @Inject(CONSTANTS.USE_CASES.UPDATE_REASON_USE_CASE)
    private readonly updateReasonUseCase: UpdateReasonUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get('/')
  async getAll() {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getReasonsUseCase.run(),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get('/id')
  async getReason(@Param('id', ParseIntPipe) id: number) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getReasonUseCase.run(id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN, ROLES.COORDINATOR)
  @Post()
  async createReason(@Body() reasonDto: ReasonCreateDto) {
    return ResponseAdapter.set(
      HttpStatus.CREATED,
      await this.createReasonUseCase.run(reasonDto),
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN, ROLES.COORDINATOR)
  @Patch('/:id')
  async updateReason(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReasonDto: ReasonUpdateDto,
  ) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.updateReasonUseCase.run(id, updateReasonDto),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
