import { IUserService } from '../../domain/service/IUser.service';

export class GetPsycologistUseCase {
  constructor(private readonly userService: IUserService) {}

  async run() {
    return await this.userService.getPsychologist();
  }
}
