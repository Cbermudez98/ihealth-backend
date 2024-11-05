import { IUser } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';
import { UserDto } from '../../infrastructure/dtos/user.dto';

export class CreateUserUseCase {
  constructor(private readonly userService: IUserService) {}

  async run(data: UserDto): Promise<IUser> {
    const newUser = this.userService.create(data);
    return newUser;
  }
}
