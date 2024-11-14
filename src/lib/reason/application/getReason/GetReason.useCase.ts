import { NotFoundError } from '../../../common/domain/errors/NotFoundErrors';
import { IReason } from '../../domain/interfaces/IReason';
import { IReasonService } from '../../domain/service/IReason.service';

export class GetReasonUseCase {
  constructor(private readonly reasonService: IReasonService) {}

  async run(id: IReason['id']) {
    const reason = await this.reasonService.get(id);
    if (!reason) {
      throw new NotFoundError('Reason not found');
    }
    return reason;
  }
}
