import { IScheduleCreate } from '../../domain/interfaces/ISchedule';
import { IScheduleService } from '../../domain/service/ISchedule.service';

export class CreateScheduleUseCase {
  constructor(private readonly scheduleService: IScheduleService) {}

  async run(schedule: IScheduleCreate) {
    return await this.scheduleService.create(schedule);
  }
}
