import {
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../entity/Schedule.entity';
import { IScheduleService } from '../../domain/service/ISchedule.service';
import { ISchedule, IScheduleCreate } from '../../domain/interfaces/ISchedule';

@Injectable()
export class ScheduleService implements IScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  async get(): Promise<ISchedule[]> {
    return await this.scheduleRepository.find();
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
}
