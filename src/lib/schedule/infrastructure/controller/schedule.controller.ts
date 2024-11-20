import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
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

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject('GetScheduleUseCase')
    private readonly getScheduleUseCase: GetScheduleUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get()
  public async getSchedules() {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getScheduleUseCase.run(),
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
      await this.getScheduleUseCase.run(),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
