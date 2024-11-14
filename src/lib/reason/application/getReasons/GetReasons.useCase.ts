import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';
import { IReasonService } from '../../domain/service/IReason.service';

export class GetReasonsUseCase {
  constructor(private readonly reasonService: IReasonService) {}

  async run() {
    const reasons = await this.reasonService.getAll();
    if (!reasons) {
      throw new NotFoundError('Reasons not found');
    }
    return reasons;
  }
}
