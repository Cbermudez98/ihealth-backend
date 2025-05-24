import { IAppointmentService } from '../../../../lib/appointment/domain/services/IAppointment.service';
import { IScheduleService } from '../../domain/service/ISchedule.service';
import { IFilterSchedule } from '../../domain/interfaces/ISchedule';

const MAX_HOUR_AVAILABLE = 20;
const MIN_HOUR_AVAILABLE = 8;
export class GetScheduleUseCase {
  constructor(
    private readonly scheduleService: IScheduleService,
    private readonly appointmentService: IAppointmentService,
  ) {}

  async run(filter: IFilterSchedule) {
    // TODO: Validate the hours and validate if the date is before
    const hour = new Date().getHours();
    console.log('🚀  ~ GetScheduleUseCase ~ run ~ hour:', hour);
    //if (hour >= MAX_HOUR_AVAILABLE || hour <= MIN_HOUR_AVAILABLE) return [];
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
