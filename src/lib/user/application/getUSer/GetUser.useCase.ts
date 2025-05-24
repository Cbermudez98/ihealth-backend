import { NotFoundError } from '../../../../lib/common/domain/errors/NotFoundErrors';
import { IUser } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';

export class GetUserUseCase {
  constructor(private readonly userService: IUserService) {}
  async run(id: IUser['id']) {
    const user = await this.userService.get(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    delete user.auth.password;
    return user;
  }
}
