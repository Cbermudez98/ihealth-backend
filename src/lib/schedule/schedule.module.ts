import { Module } from '@nestjs/common';
import { ScheduleController } from './infrastructure/controller/schedule.controller';
import { ScheduleService } from './infrastructure/service/schedule.service';
import { ScheduleSeeder } from 'src/seeds/schedule.seeder';
import { IScheduleService } from './domain/service/ISchedule.service';
import { GetScheduleUseCase } from './application/getSchedules/GetSchedule.useCase';
import { CreateScheduleUseCase } from './application/createSchedule/CreateSchedule.useCase';
import { RoleService } from '../role/infrastructure/service/role.service';
import { JwtAuthGuard } from '../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/infrastructure/entity/role.entity';
import { Schedule } from './infrastructure/entity/Schedule.entity';
import { AppointmentService } from '../appointment/infrastructure/service/appointment/appointment.service';
import { IAppointmentService } from '../appointment/domain/services/IAppointment.service';
import { Appointment } from '../appointment/infrastructure/entity/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Schedule, Appointment])],
  controllers: [ScheduleController],
  providers: [
    {
      provide: 'ScheduleService',
      useClass: ScheduleService,
    },
    {
      provide: 'AppointmentService',
      useClass: AppointmentService,
    },
    {
      provide: 'CreateScheduleUseCase',
      useFactory: (scheduleService: IScheduleService) =>
        new CreateScheduleUseCase(scheduleService),
      inject: ['ScheduleService'],
    },
    {
      provide: 'GetScheduleUseCase',
      useFactory: (
        scheduleService: IScheduleService,
        appointmentService: IAppointmentService,
      ) => new GetScheduleUseCase(scheduleService, appointmentService),
      inject: ['ScheduleService', 'AppointmentService'],
    },
    ScheduleSeeder,
    RoleService,
    JwtAuthGuard,
    JwtProvider,
  ],
})
export class ScheduleModule {}
