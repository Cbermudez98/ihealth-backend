import { IReason } from '../../../../lib/reason/domain/interfaces/IReason';
import { ICauseService } from '../../domain/service/ICause.service';

export class GetCauseByReasonUseCase {
  constructor(private readonly causeService: ICauseService) {}

  async run(id: IReason['id']) {
    return await this.causeService.get(id);
  }
}
