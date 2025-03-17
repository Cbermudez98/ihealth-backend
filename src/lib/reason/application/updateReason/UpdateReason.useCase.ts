import { NotFoundError } from '../../../common/domain/errors/NotFoundErrors';
import { IReason, IReasonUpdate } from '../../domain/interfaces/IReason';
import { IReasonService } from '../../domain/service/IReason.service';

export class UpdateReasonUseCase {
  constructor(private readonly reasonService: IReasonService) {}

  async run(id: IReason['id'], reasonToUpdate: IReasonUpdate) {
    const reason = await this.reasonService.get(id);
    if (!reason) {
      throw new NotFoundError('Reason not found');
    }

    return await this.reasonService.update(id, reasonToUpdate);
  }
}
