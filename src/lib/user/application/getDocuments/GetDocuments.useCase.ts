import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';
import { IUserService } from '../../domain/service/IUser.service';

export class GetDocumentsUseCase {
  constructor(private readonly userService: IUserService) {}
  async run() {
    const documents = await this.userService.getDocuments();
    if (!documents) {
      throw new NotFoundError('User not found');
    }
    return documents;
  }
}
