import { IUserService } from '../../domain/service/IUser.service';

export class GetAllUsersUseCase {
  constructor(private readonly userService: IUserService) {}

  async run() {
    return await this.userService.getAll();
  }
}
