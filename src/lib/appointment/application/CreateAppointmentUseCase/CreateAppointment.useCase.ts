import { IUserService } from '../../../user/domain/service/IUser.service';
import {
  IAppointmentCreate,
  IAppointmentSave,
} from '../../domain/interfaces/IAppointment';
import { IUser } from '../../../user/domain/interfaces/IUser';
import { IStatusService } from '../../domain/services/IStatus.service';
import { ICauseService } from 'src/lib/cause/domain/service/ICause.service';
import { IReasonService } from 'src/lib/reason/domain/service/IReason.service';
import { IScheduleService } from 'src/lib/schedule/domain/service/ISchedule.service';
import { IAppointmentService } from '../../domain/services/IAppointment.service';
import { FoundError } from 'src/lib/common/domain/errors/FoundError';
import { DateUtil } from 'src/lib/common/domain/utils/date';
import { BadRequestError } from 'src/lib/common/domain/errors/BadRequestError';

export class CreateAppointmentUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly statusService: IStatusService,
    private readonly causeService: ICauseService,
    private readonly reasonService: IReasonService,
    private readonly scheduleService: IScheduleService,
    private readonly appointmentService: IAppointmentService,
  ) {}
  async run(createAppointmentDto: IAppointmentCreate) {
    try {
      if (!DateUtil.isDateTodayOrFuture(createAppointmentDto.date)) {
        throw new BadRequestError('The date is invalid');
      }
      const hasAnAppointment =
        await this.appointmentService.getActiveAppointmentUser(
          createAppointmentDto.user,
        );
      if (hasAnAppointment) {
        throw new FoundError('User has a current appointment');
      }
      const date = new Date(createAppointmentDto.date.setHours(0, 0, 0, 0));
      createAppointmentDto.date = date;

      const scheduleTook = await this.scheduleService.scheduleHasBeenTaken(
        createAppointmentDto.schedule,
        date,
      );
      if (scheduleTook) {
        throw new FoundError('Schedule has been taken');
      }

      let appointment: IAppointmentSave = {} as IAppointmentSave;
      appointment.user = await this.userService.get(createAppointmentDto.user);
      appointment.psychologist = await this.userService.get(
        createAppointmentDto.psychologist,
      );
      appointment.status = await this.statusService.get(
        createAppointmentDto.status,
      );
      appointment.cause = await this.causeService.getSingle(
        createAppointmentDto.cause,
      );
      appointment.reason = await this.reasonService.get(
        createAppointmentDto.reason,
      );

      appointment.schedule = await this.scheduleService.getSingle(
        createAppointmentDto.schedule,
      );

      appointment.date = createAppointmentDto.date;
      appointment.description = createAppointmentDto.description;
      console.log(
        '🚀  ~ CreateAppointmentUseCase ~ run ~ appointment:',
        appointment,
      );
      await this.appointmentService.create(appointment);
      return { msg: 'Created with success' };
    } catch (error) {
      console.log('🚀  ~ CreateAppointmentUseCase ~ run ~ error:', error);
      throw error;
    }
  }
}
