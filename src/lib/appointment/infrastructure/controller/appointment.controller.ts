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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../application/CreateAppointmentUseCase/CreateAppointment.useCase';
import { AppointmentCreateDto } from '../dtos/appointment.dto';
import { ResponseAdapter } from '../../../../common/response-adapter/response.adapter';
import { HTTP_RESPONSE_MESSAGE } from '../../../../common/constants/http-message';
import { JwtAuthGuard } from '../../../../lib/auth/infrastructure/guard/jwt/jwt-auth.guard';
import { RoleGuard } from '../../../../lib/auth/infrastructure/guard/role/role.guard';
import { Roles } from '../../../../lib/role/infrastructure/decorator/role.decorator';
import { ROLES } from '../../../../common/constants/roles.enum';
import { CurrentAppointmentUseCase } from '../../application/CurrentAppointmentUseCase/getCurrentAppointment.useCase';
import { ITokenPayload } from '../../../../lib/auth/infrastructure/interfaces/IToken';
import { KEYS } from '../../../../common/constants/keys';
import { GetHistoryAppointmentUseCase } from '../../application/GetHistoryAppopointmentUseCase/getHistoryAppointment.useCase';
import { UpdateStatusAppointmentUseCase } from '../../application/updateStatusAppointment/updateStatusAppointment.useCase';
import { GetAllAppointmentsUSeCase } from '../../application/GetAllAppointmentsUseCase/getAllAppointments.useCase';
import { CONSTANTS } from '../../../../common/constants/constants';

@Controller('appointment')
export class AppointmentController {
  constructor(
    @Inject(CONSTANTS.USE_CASES.CREATE_APPOINTMENT_USE_CASE)
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    @Inject(CONSTANTS.USE_CASES.CURRENT_APPOINTMENT_USE_CASE)
    private readonly currentAppointmentUseCase: CurrentAppointmentUseCase,
    @Inject(CONSTANTS.USE_CASES.GET_HISTORY_APPOINTMENT_USE_CASE)
    private readonly getHistoryAppointmentUseCase: GetHistoryAppointmentUseCase,
    @Inject(CONSTANTS.USE_CASES.UPDATE_APPOINTMENT_USE_CASE)
    private readonly updateStatusAppointmentUseCase: UpdateStatusAppointmentUseCase,
    @Inject(CONSTANTS.USE_CASES.GET_ALL_APPOINTMENTS_USE_CASE)
    private readonly getAllAppointmentsUSeCase: GetAllAppointmentsUSeCase,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER)
  @Get()
  public async currentAppointment(@Req() req: Request) {
    const token: ITokenPayload = req[KEYS.USER] as ITokenPayload;
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.currentAppointmentUseCase.run(token.id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Get('/history/all')
  public async getAll() {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getAllAppointmentsUSeCase.run(),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get('/history')
  public async appointmentHistory(@Req() req: Request) {
    const token: ITokenPayload = req[KEYS.USER] as ITokenPayload;
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getHistoryAppointmentUseCase.run(token.id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Post()
  public async createAppointment(
    @Body() createAppointmentDto: AppointmentCreateDto,
  ) {
    return ResponseAdapter.set(
      HttpStatus.CREATED,
      await this.createAppointmentUseCase.run(createAppointmentDto),
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN, ROLES.COORDINATOR)
  @Patch('/:appointment_id/:status_id')
  public async changeStatus(
    @Param('appointment_id', ParseIntPipe) appointment_id: number,
    @Param('status_id', ParseIntPipe) status_id: number,
  ) {
    return ResponseAdapter.set(
      HttpStatus.CREATED,
      await this.updateStatusAppointmentUseCase.run(appointment_id, status_id),
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }
}
