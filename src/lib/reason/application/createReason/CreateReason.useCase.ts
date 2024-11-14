import { IReasonCreate } from '../../domain/interfaces/IReason';
import { IReasonService } from '../../domain/service/IReason.service';

export class CreateReasonUseCase {
  constructor(private readonly reasonService: IReasonService) {}

  async run(reason: IReasonCreate) {
    return await this.reasonService.create(reason);
  }
}
