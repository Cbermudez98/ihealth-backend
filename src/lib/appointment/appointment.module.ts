import { forwardRef, Module } from '@nestjs/common';
import { AppointmentController } from './infrastructure/controller/appointment.controller';
import { AppointmentService } from './infrastructure/service/appointment/appointment.service';
import { StatusSeeder } from './../../seeds/status.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './infrastructure/entity/status.entity';
import { Appointment } from './infrastructure/entity/appointment.entity';
import { CreateAppointmentUseCase } from './application/CreateAppointmentUseCase/CreateAppointment.useCase';
import { IUserService } from '../user/domain/service/IUser.service';
import { IStatusService } from './domain/services/IStatus.service';
import { IReasonService } from '../reason/domain/service/IReason.service';
import { ICauseService } from '../cause/domain/service/ICause.service';
import { IScheduleService } from '../schedule/domain/service/ISchedule.service';
import { IAppointmentService } from './domain/services/IAppointment.service';
import { Role } from '../role/infrastructure/entity/role.entity';
import { Career } from '../career/infrastructure/entity/career.entity';
import { StatusService } from './infrastructure/service/status/status.service';
import { CurrentAppointmentUseCase } from './application/CurrentAppointmentUseCase/getCurrentAppointment.useCase';
import { GetHistoryAppointmentUseCase } from './application/GetHistoryAppopointmentUseCase/getHistoryAppointment.useCase';
import { UpdateStatusAppointmentUseCase } from './application/updateStatusAppointment/updateStatusAppointment.useCase';
import { IMailerService } from '../common/domain/services/IMailer.service';
import { IICsService } from '../common/domain/services/IICs.service';
import { GetAllAppointmentsUSeCase } from './application/GetAllAppointmentsUseCase/getAllAppointments.useCase';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from '../user/user.module';
import { CONSTANTS } from 'src/common/constants/constants';
import { CauseModule } from '../cause/cause.module';
import { ReasonModule } from '../reason/reason.module';
import { ScheduleModule } from '../schedule/schedule.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Status, Role, Career]),
    SharedModule,
    UserModule,
    CauseModule,
    ReasonModule,
    ScheduleModule,
  ],
  controllers: [AppointmentController],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE,
      useClass: AppointmentService,
    },
    {
      provide: CONSTANTS.PROVIDERS.STATUS_SERVICE,
      useClass: StatusService,
    },
    {
      provide: CONSTANTS.USE_CASES.CREATE_APPOINTMENT_USE_CASE,
      useFactory: (
        userService: IUserService,
        statusService: IStatusService,
        causeService: ICauseService,
        reasonService: IReasonService,
        scheduleService: IScheduleService,
        appointmentService: IAppointmentService,
        mailService: IMailerService,
        IcsProvider: IICsService,
      ) =>
        new CreateAppointmentUseCase(
          userService,
          statusService,
          causeService,
          reasonService,
          scheduleService,
          appointmentService,
          mailService,
          IcsProvider,
        ),
      inject: [
        CONSTANTS.PROVIDERS.USER_SERVICE,
        CONSTANTS.PROVIDERS.STATUS_SERVICE,
        CONSTANTS.PROVIDERS.CAUSE_SERVICE,
        CONSTANTS.PROVIDERS.REASON_SERVICE,
        CONSTANTS.PROVIDERS.SCHEDULE_SERVICE,
        CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE,
        CONSTANTS.PROVIDERS.MAIL_SERVICE,
        CONSTANTS.PROVIDERS.ICS_PROVIDER,
      ],
    },
    {
      provide: CONSTANTS.USE_CASES.CURRENT_APPOINTMENT_USE_CASE,
      useFactory: (appointmentService: IAppointmentService) =>
        new CurrentAppointmentUseCase(appointmentService),
      inject: [CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_HISTORY_APPOINTMENT_USE_CASE,
      useFactory: (appointmentService: IAppointmentService) =>
        new GetHistoryAppointmentUseCase(appointmentService),
      inject: [CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.UPDATE_APPOINTMENT_USE_CASE,
      useFactory: (
        appointmentService: IAppointmentService,
        statusService: IStatusService,
      ) =>
        new UpdateStatusAppointmentUseCase(appointmentService, statusService),
      inject: [
        CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE,
        CONSTANTS.PROVIDERS.STATUS_SERVICE,
      ],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_ALL_APPOINTMENTS_USE_CASE,
      useFactory: (appointmentService: IAppointmentService) =>
        new GetAllAppointmentsUSeCase(appointmentService),
      inject: [CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE],
    },
    StatusSeeder,
    StatusSeeder,
  ],
  exports: [CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE],
})
export class AppointmentModule {}
