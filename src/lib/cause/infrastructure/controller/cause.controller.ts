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
import { ROLES } from '../../../../common/constants/roles.enum';
import { JwtAuthGuard } from './../../../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { RoleGuard } from './../../../auth/infrastructure/guard/role/role.guard';
import { Roles } from './../../../role/infrastructure/decorator/role.decorator';
import { CauseDto } from '../dtos/cause.dto';
import { ResponseAdapter } from '../../../../common/response-adapter/response.adapter';
import { CreateCauseUseCase } from '../../application/createCauseUseCase/CreateCause.useCase';
import { HTTP_RESPONSE_MESSAGE } from '../../../../common/constants/http-message';
import { CauseUpdateDto } from '../dtos/cause-update.dto';
import { UpdateCauseUseCase } from '../../application/updateCauseUseCase/UpdateCause.useCase';
import { GetCauseByReasonUseCase } from '../../application/getCauseByReasonUseCase/GetCause.useCase';
import { CONSTANTS } from '../../../../common/constants/constants';

@Controller('cause')
export class CauseController {
  constructor(
    @Inject(CONSTANTS.USE_CASES.CREATE_CAUSE_USE_CASE)
    private readonly createCauseUseCase: CreateCauseUseCase,
    @Inject(CONSTANTS.USE_CASES.UPDATE_CAUSE_USE_CASE)
    private readonly updateCauseUseCase: UpdateCauseUseCase,
    @Inject(CONSTANTS.USE_CASES.GET_CAUSE_BY_REASON_USE_CASE)
    private readonly getCauseByReasonUseCase: GetCauseByReasonUseCase,
  ) {}
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Post('/:id')
  async createCause(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCauseDto: CauseDto,
  ) {
    await this.createCauseUseCase.run(id, createCauseDto);
    return ResponseAdapter.set(
      HttpStatus.OK,
      {},
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
    await this.updateCauseUseCase.run(id, createCauseDto);
    return ResponseAdapter.set(
      HttpStatus.OK,
      {},
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER)
  @Get('/:id')
  async getCause(@Param('id', ParseIntPipe) id: number) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getCauseByReasonUseCase.run(id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
