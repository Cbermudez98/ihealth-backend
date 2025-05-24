import { NotCreatedError } from '../../../../lib/common/domain/errors/NotCreatedError';
import { ICause, ICauseUpdate } from '../../domain/interfaces/ICause';
import { ICauseService } from '../../domain/service/ICause.service';

export class UpdateCauseUseCase {
  constructor(private readonly causeService: ICauseService) {}

  async run(id: ICause['id'], cause: ICauseUpdate) {
    const causeUpdated = await this.causeService.update(id, cause);
    if (!causeUpdated) {
      throw new NotCreatedError('Error updating cause');
    }
    return true;
  }
}
