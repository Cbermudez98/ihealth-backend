import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseAdapter } from '../../../../common/response-adapter/response.adapter';
import { GetScheduleUseCase } from '../../application/getSchedules/GetSchedule.useCase';
import { HTTP_RESPONSE_MESSAGE } from './../../../../common/constants/http-message';
import { Roles } from './../../../role/infrastructure/decorator/role.decorator';
import { ROLES } from '../../../../common/constants/roles.enum';
import { JwtAuthGuard } from './../../../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { RoleGuard } from './../../../auth/infrastructure/guard/role/role.guard';
import { CreateScheduleDto } from '../dtos/schedule.dto';
import { FilterScheduleDto } from '../dtos/filter.dto';
import { DAYS } from 'src/common/constants/keys';
import { CONSTANTS } from 'src/common/constants/constants';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(CONSTANTS.USE_CASES.GET_SCHEDULE_USE_CASE)
    private readonly getScheduleUseCase: GetScheduleUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get()
  public async getSchedules(@Query() filter: FilterScheduleDto) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getScheduleUseCase.run(filter),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get('available-days')
  public async getAvailableDay() {
    return ResponseAdapter.set(
      HttpStatus.OK,
      DAYS,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Post()
  public async createSchedules(@Body() createScheduleDto: CreateScheduleDto) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      {},
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
