import { IUserService } from '../../../user/domain/service/IUser.service';
import {
  IAppointmentCreate,
  IAppointmentSave,
} from '../../domain/interfaces/IAppointment';
import { IUser } from '../../../user/domain/interfaces/IUser';
import { IStatusService } from '../../domain/services/IStatus.service';
import { ICauseService } from '../../../../lib/cause/domain/service/ICause.service';
import { IReasonService } from '../../../../lib/reason/domain/service/IReason.service';
import { IScheduleService } from '../../../../lib/schedule/domain/service/ISchedule.service';
import { IAppointmentService } from '../../domain/services/IAppointment.service';
import { FoundError } from '../../../../lib/common/domain/errors/FoundError';
import { DateUtil } from '../../../../lib/common/domain/utils/date';
import { BadRequestError } from '../../../../lib/common/domain/errors/BadRequestError';
import {
  IMail,
  IMailerService,
  TEMPLATE_MAIL,
} from '../../../../lib/common/domain/services/IMailer.service';
import {
  IICs,
  IICsService,
} from '../../../../lib/common/domain/services/IICs.service';
import { MAIL } from '../../../../common/constants/keys';
import { DateTime } from 'luxon';
import { IFilterSchedule } from 'src/lib/schedule/domain/interfaces/ISchedule';

export class CreateAppointmentUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly statusService: IStatusService,
    private readonly causeService: ICauseService,
    private readonly reasonService: IReasonService,
    private readonly scheduleService: IScheduleService,
    private readonly appointmentService: IAppointmentService,
    private readonly mailService: IMailerService,
    private readonly icsService: IICsService,
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
      date.setDate(date.getDate() + 1);
      console.log('🚀  ~ CreateAppointmentUseCase ~ run ~ date:', date);
      createAppointmentDto.date = date;

      const dateString = createAppointmentDto.date.toISOString().split('T')[0];
      const dayOfWeek = new Date(createAppointmentDto.date).getDay();
      const filter: IFilterSchedule = {
        date: dateString,
        day: dayOfWeek.toString(),
      };
      const appointments =
        await this.appointmentService.getAppointmentsByDate(filter);
      if (appointments.length > 0) {
        throw new FoundError(
          'The schedule conflicts with an existing appointment',
        );
      }

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
      const baseDate = DateTime.fromJSDate(appointment.date, {
        zone: 'America/Bogota',
      });

      const [startHour, startMinute] = appointment.schedule.start_time
        .split(':')
        .map(Number);
      const [endHour, endMinute] = appointment.schedule.end_time
        .split(':')
        .map(Number);

      const startDate = baseDate.set({
        hour: startHour,
        minute: startMinute,
        second: 0,
        millisecond: 0,
      });

      const endDate = baseDate.set({
        hour: endHour,
        minute: endMinute,
        second: 0,
        millisecond: 0,
      });

      await this.appointmentService.create(appointment);

      const ics: IICs = {
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        summary: MAIL.SUMMARY,
        description: MAIL.DESCRIPTION,
        location: MAIL.LOCATION,
        url: MAIL.URL,
        mailTo: appointment.user.auth.email,
      };
      const icsFile = this.icsService.generate(ics);
      console.log('🚀  ~ CreateAppointmentUseCase ~ run ~ ics:', ics);
      const mail: IMail = {
        to: appointment.user.auth.email,
        subject: 'Confirmacion de cita IHealth',
        template: TEMPLATE_MAIL.SCHEDULED_APPOINTMENT,
        callEvent: {
          fileName: 'appointment.ics',
          content: icsFile,
          encoding: 'utf-8',
        },
        context: {
          doctorName: `${appointment.psychologist.name} ${appointment.psychologist.last_name}`,
          appointmentDate: startDate
            .setLocale('es')
            .toFormat('cccc, dd LLL yyyy'),
          appointmentTime: `${appointment.schedule.start_time} - ${appointment.schedule.end_time}`,
        },
      };
      console.log('🚀  ~ CreateAppointmentUseCase ~ run ~ mail:', mail);
      await this.mailService.sendEmail(mail);
      return { msg: 'Created with success' };
    } catch (error) {
      console.log('🚀  ~ CreateAppointmentUseCase ~ run ~ error:', error);
      throw error;
    }
  }
}
