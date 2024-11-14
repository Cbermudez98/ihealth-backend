import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';
import { IUser, IUserUpdate } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';
import { IHashProvider } from 'src/lib/common/domain/services/IHash.service';

export class UpdateUserUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly hashProvider: IHashProvider,
  ) {}
  async run(id: IUser['id'], userUpdateDto: IUserUpdate) {
    const user = await this.userService.get(id);
    if (!user) {
      throw new NotFoundError('Error user not found');
    }

    if (userUpdateDto?.auth?.password) {
      userUpdateDto.auth.password = this.hashProvider.encrypt(
        userUpdateDto.auth.password,
      );
    }
    await this.userService.update(id, userUpdateDto);
    return true;
  }
}
