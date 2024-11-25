import { Module } from '@nestjs/common';
import { AppointmentController } from './infrastructure/controller/appointment.controller';
import { AppointmentService } from './infrastructure/service/appointment/appointment.service';
import { StatusSeeder } from './../../seeds/status.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reason } from '../reason/infrastructure/entity/reason.entity';
import { Status } from './infrastructure/entity/status.entity';
import { Appointment } from './infrastructure/entity/appointment.entity';
import { CreateAppointmentUseCase } from './application/CreateAppointmentUseCase/CreateAppointment.useCase';
import { IUserService } from '../user/domain/service/IUser.service';
import { IStatusService } from './domain/services/IStatus.service';
import { IReasonService } from '../reason/domain/service/IReason.service';
import { ICauseService } from '../cause/domain/service/ICause.service';
import { IScheduleService } from '../schedule/domain/service/ISchedule.service';
import { IAppointmentService } from './domain/services/IAppointment.service';
import { UserService } from '../user/infrastructure/service/user.service';
import { User } from '../user/infrastructure/entity/user.entity';
import { Role } from '../role/infrastructure/entity/role.entity';
import { RoleService } from '../role/infrastructure/service/role.service';
import { CareerService } from '../career/infrastructure/service/career.service';
import { Career } from '../career/infrastructure/entity/career.entity';
import { JwtAuthGuard } from '../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';
import { StatusService } from './infrastructure/service/status/status.service';
import { CauseService } from '../cause/infrastructure/service/cause.service';
import { Cause } from '../cause/infrastructure/entity/cause.entity';
import { ReasonService } from '../reason/infrastructure/service/reason.service';
import { ScheduleService } from '../schedule/infrastructure/service/schedule.service';
import { Schedule } from '../schedule/infrastructure/entity/Schedule.entity';
import { CurrentAppointmentUseCase } from './application/CurrentAppointmentUseCase/getCurrentAppointment.useCase';
import { GetHistoryAppointmentUseCase } from './application/GetHistoryAppopointmentUseCase/getHistoryAppointment.useCase';
import { UpdateStatusAppointmentUseCase } from './application/updateStatusAppointment/updateStatusAppointment.useCase';
import { MailService } from 'src/shared/mail/mail.service';
import { IcsProvider } from 'src/shared/providers/ics.provider/ics.provider';
import { IMailerService } from '../common/domain/services/IMailer.service';
import { IICsService } from '../common/domain/services/IICs.service';
import { MailModule } from 'src/shared/mail/mail.module';
import { GetAllAppointmentsUSeCase } from './application/GetAllAppointmentsUseCase/getAllAppointments.useCase';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Status,
      User,
      Role,
      Career,
      Cause,
      Reason,
      Schedule,
    ]),
    MailModule,
  ],
  controllers: [AppointmentController],
  providers: [
    {
      provide: 'AppointmentService',
      useClass: AppointmentService,
    },
    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: 'StatusService',
      useClass: StatusService,
    },
    {
      provide: 'CauseService',
      useClass: CauseService,
    },
    {
      provide: 'ReasonService',
      useClass: ReasonService,
    },
    {
      provide: 'ScheduleService',
      useClass: ScheduleService,
    },
    {
      provide: 'AppointmentService',
      useClass: AppointmentService,
    },
    {
      provide: 'MailService',
      useClass: MailService,
    },
    {
      provide: 'IcsService',
      useClass: IcsProvider,
    },
    {
      provide: 'CreateAppointmentUseCase',
      useFactory: (
        userService: IUserService,
        statusService: IStatusService,
        causeService: ICauseService,
        reasonService: IReasonService,
        scheduleService: IScheduleService,
        appointmentService: IAppointmentService,
        mailService: IMailerService,
        icsService: IICsService,
      ) =>
        new CreateAppointmentUseCase(
          userService,
          statusService,
          causeService,
          reasonService,
          scheduleService,
          appointmentService,
          mailService,
          icsService,
        ),
      inject: [
        'UserService',
        'StatusService',
        'CauseService',
        'ReasonService',
        'ScheduleService',
        'AppointmentService',
        'MailService',
        'IcsService',
      ],
    },
    {
      provide: 'CurrentAppointmentUseCase',
      useFactory: (appointmentService: IAppointmentService) =>
        new CurrentAppointmentUseCase(appointmentService),
      inject: ['AppointmentService'],
    },
    {
      provide: 'GetHistoryAppointmentUseCase',
      useFactory: (appointmentService: IAppointmentService) =>
        new GetHistoryAppointmentUseCase(appointmentService),
      inject: ['AppointmentService'],
    },
    {
      provide: 'UpdateStatusAppointmentUseCase',
      useFactory: (
        appointmentService: IAppointmentService,
        statusService: IStatusService,
      ) =>
        new UpdateStatusAppointmentUseCase(appointmentService, statusService),
      inject: ['AppointmentService', 'StatusService'],
    },
    {
      provide: 'GetAllAppointmentsUSeCase',
      useFactory: (appointmentService: IAppointmentService) =>
        new GetAllAppointmentsUSeCase(appointmentService),
      inject: ['AppointmentService'],
    },
    StatusSeeder,
    StatusSeeder,
    RoleService,
    CareerService,
    JwtAuthGuard,
    JwtProvider,
  ],
})
export class AppointmentModule {}
