import { IAppointment } from '../../../../../lib/appointment/domain/interfaces/IAppointment';
import { IAppointmentService } from './../../../domain/services/IAppointment.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../../entity/appointment.entity';
import { Between, In, Or, Repository } from 'typeorm';
import { IUser } from '../../../../../lib/user/domain/interfaces/IUser';
import {
  IStatus,
  STATUS,
} from '../../../../../lib/appointment/domain/interfaces/IStatus';
import { NotFoundError } from '../../../../../lib/common/domain/errors/NotFoundErrors';
import { IFilterSchedule } from '../../../../../lib/schedule/domain/interfaces/ISchedule';
import { DateUtil } from '../../../../../lib/common/domain/utils/date';

@Injectable()
export class AppointmentService implements IAppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  async create(appointment: IAppointment): Promise<IAppointment> {
    let newAppointment: IAppointment | undefined;
    try {
      newAppointment = this.appointmentRepository.create(appointment);
    } catch (error) {
      throw new RequestTimeoutException('Could not create appointment');
    }

    try {
      newAppointment = await this.appointmentRepository.save(newAppointment);
    } catch (error) {
      throw new UnprocessableEntityException('Could not save the appointment');
    }
    return appointment;
  }

  async getActiveAppointmentUser(id: IUser['id']): Promise<boolean> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: {
          user: {
            id: id,
          },
          status: [
            {
              name: STATUS.ATTENDED,
            },
            {
              name: STATUS.PENDING,
            },
          ],
        },
      });
      return Boolean(appointment);
    } catch (error) {
      throw new RequestTimeoutException('Could not get appointment');
    }
  }

  async changeStatus(
    appointment: IAppointment,
    status: IStatus,
  ): Promise<boolean> {
    try {
      appointment.status = status;
      await this.appointmentRepository.save(appointment);
      return true;
    } catch (error) {
      throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED);
    }
  }

  async get(id: IAppointment['id']): Promise<IAppointment> {
    try {
      return await this.appointmentRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundError('Appointment not found');
    }
  }

  async getByUserId(id: IUser['id']): Promise<IAppointment> {
    try {
      return await this.appointmentRepository.findOne({
        where: {
          user: {
            id,
          },
          status: [
            {
              name: STATUS.ATTENDED,
            },
            {
              name: STATUS.PENDING,
            },
          ],
        },
        relations: {
          status: true,
          cause: {
            reason: false,
          },
          reason: {
            causes: false,
          },
          psychologist: true,
          schedule: true,
        },
      });
    } catch (error) {
      throw new NotFoundError('Appointment not found');
    }
  }

  async getHistory(id: IUser['id']): Promise<IAppointment[]> {
    try {
      return await this.appointmentRepository.find({
        where: {
          user: {
            id,
          },
        },
        relations: {
          status: true,
          cause: {
            reason: false,
          },
          reason: {
            causes: false,
          },
          psychologist: true,
          schedule: true,
        },
      });
    } catch (error) {
      throw new NotFoundError('Appointment not found');
    }
  }

  public async getAppointmentsByDate(
    schedule: IFilterSchedule,
  ): Promise<IAppointment[]> {
    const startOfDay = DateUtil.getStartDate(schedule.date);

    const endOfDay = DateUtil.getEndDate(schedule.date);
    const appointments = await this.appointmentRepository.find({
      where: {
        date: Between(startOfDay, endOfDay),
      },
      relations: ['schedule'],
    });

    return appointments;
  }

  async getAll(): Promise<IAppointment[]> {
    try {
      const appointment = await this.appointmentRepository.find({
        where: {
          status: {
            name: In([STATUS.PENDING, STATUS.ATTENDED, STATUS.CLOSE]),
          },
        },
        relations: {
          user: true,
          schedule: true,
          cause: false,
          status: true,
        },
        select: {
          id: true,
          description: false,
          user: {
            id: true,
            name: true,
            last_name: true,
            code: true,
          },
          date: true,
          schedule: {
            id: true,
            day: true,
            start_time: true,
          },
          status: {
            id: true,
            name: true,
          },
        },
      });
      return appointment;
    } catch (error) {
      throw new NotFoundError('Appointment not found');
    }
  }
}
