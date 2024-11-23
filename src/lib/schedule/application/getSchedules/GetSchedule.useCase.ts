import { IAppointmentService } from 'src/lib/appointment/domain/services/IAppointment.service';
import { IScheduleService } from '../../domain/service/ISchedule.service';
import { IFilterSchedule } from '../../domain/interfaces/ISchedule';

export class GetScheduleUseCase {
  constructor(
    private readonly scheduleService: IScheduleService,
    private readonly appointmentService: IAppointmentService,
  ) {}

  async run(filter: IFilterSchedule) {
    const schedules = await this.scheduleService.get(filter.day);
    const appointments =
      await this.appointmentService.getAppointmentsByDate(filter);
    return schedules.filter((schedule) => {
      return !appointments.some((appointment) => {
        return (
          appointment.schedule.start_time === schedule.start_time &&
          appointment.schedule.end_time &&
          schedule.end_time
        );
      });
    });
  }
}
