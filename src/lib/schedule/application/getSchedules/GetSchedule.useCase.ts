import { IScheduleService } from '../../domain/service/ISchedule.service';

export class GetScheduleUseCase {
  constructor(private readonly scheduleService: IScheduleService) {}

  async run() {
    return await this.scheduleService.get();
  }
}
