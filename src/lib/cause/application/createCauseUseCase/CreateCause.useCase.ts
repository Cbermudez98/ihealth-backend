import { IReason } from './../../../reason/domain/interfaces/IReason';
import { ICauseService } from '../../domain/service/ICause.service';
import { ICauseCreate } from '../../domain/interfaces/ICause';
import { NotCreatedError } from './../../../common/domain/errors/NotCreatedError';

export class CreateCauseUseCase {
  constructor(private readonly causeService: ICauseService) {}

  async run(id: IReason['id'], cause: ICauseCreate) {
    const newCause = await this.causeService.create(id, cause);
    if (!newCause) {
      throw new NotCreatedError('Error creating reason');
    }
    return newCause;
  }
}
