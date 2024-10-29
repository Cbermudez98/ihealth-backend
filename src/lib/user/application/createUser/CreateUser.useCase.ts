import { IUser } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';

export class CreateUserUseCase {
  constructor(private readonly userService: IUserService) {}
  async run(): Promise<IUser> {
    return await this.userService.create();
  }
}
