import { Module } from '@nestjs/common';
import { AppointmentController } from './infrastructure/controller/appointment.controller';
import { AppointmentService } from './infrastructure/service/appointment.service';
import { StatusSeeder } from './../../seeds/status.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reason } from '../reason/infrastructure/entity/reason.entity';
import { Status } from './infrastructure/entity/status.entity';
import { Appointment } from './infrastructure/entity/appointment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Status])],
  controllers: [AppointmentController],
  providers: [AppointmentService, StatusSeeder, StatusSeeder],
})
export class AppointmentModule {}
