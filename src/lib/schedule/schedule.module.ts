import { forwardRef, Module } from '@nestjs/common';
import { ScheduleController } from './infrastructure/controller/schedule.controller';
import { ScheduleService } from './infrastructure/service/schedule.service';
import { ScheduleSeeder } from '../../seeds/schedule.seeder';
import { IScheduleService } from './domain/service/ISchedule.service';
import { GetScheduleUseCase } from './application/getSchedules/GetSchedule.useCase';
import { CreateScheduleUseCase } from './application/createSchedule/CreateSchedule.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/infrastructure/entity/role.entity';
import { Schedule } from './infrastructure/entity/Schedule.entity';
import { IAppointmentService } from '../appointment/domain/services/IAppointment.service';
import { SharedModule } from '../../shared/shared.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { CONSTANTS } from '../../common/constants/constants';
import { Appointment } from '../appointment/infrastructure/entity/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Schedule, Appointment]),
    SharedModule,
    forwardRef(() => AppointmentModule),
  ],
  controllers: [ScheduleController],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.SCHEDULE_SERVICE,
      useClass: ScheduleService,
    },
    {
      provide: CONSTANTS.USE_CASES.CREATE_SCHEDULE_USE_CASE,
      useFactory: (scheduleService: IScheduleService) =>
        new CreateScheduleUseCase(scheduleService),
      inject: [CONSTANTS.PROVIDERS.SCHEDULE_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_SCHEDULE_USE_CASE,
      useFactory: (
        scheduleService: IScheduleService,
        appointmentService: IAppointmentService,
      ) => new GetScheduleUseCase(scheduleService, appointmentService),
      inject: [
        CONSTANTS.PROVIDERS.SCHEDULE_SERVICE,
        CONSTANTS.PROVIDERS.APPOINTMENT_SERVICE,
      ],
    },
    ScheduleSeeder,
  ],
  exports: [CONSTANTS.PROVIDERS.SCHEDULE_SERVICE],
})
export class ScheduleModule {}
