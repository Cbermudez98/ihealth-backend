import {
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Schedule } from '../entity/Schedule.entity';
import { IScheduleService } from '../../domain/service/ISchedule.service';
import { ISchedule, IScheduleCreate } from '../../domain/interfaces/ISchedule';
import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';
import { Appointment } from 'src/lib/appointment/infrastructure/entity/appointment.entity';
import { DateUtil } from 'src/lib/common/domain/utils/date';

@Injectable()
export class ScheduleService implements IScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  async get(day: string): Promise<ISchedule[]> {
    return await this.scheduleRepository.find({
      where: {
        day,
        start_time: MoreThan('08:00:00'),
      },
    });
  }

  async create(schedule: IScheduleCreate): Promise<ISchedule> {
    let newSchedule: ISchedule | undefined;
    try {
      newSchedule = this.scheduleRepository.create(schedule);
    } catch (error) {
      throw new RequestTimeoutException('Could not create schedule');
    }

    try {
      newSchedule = await this.scheduleRepository.save(newSchedule);
    } catch (error) {
      throw new UnprocessableEntityException('Could not save schedule');
    }
    return newSchedule;
  }

  async getSingle(id: ISchedule['id']): Promise<ISchedule> {
    try {
      return await this.scheduleRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      throw new NotFoundError('Schedule not found');
    }
  }

  async scheduleHasBeenTaken(
    id: ISchedule['id'],
    date: Date,
  ): Promise<boolean> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: {
          date,
          schedule: {
            id,
          },
        },
      });
      return Boolean(appointment);
    } catch (error) {
      throw new RequestTimeoutException('Error getting schedule');
    }
  }
}
