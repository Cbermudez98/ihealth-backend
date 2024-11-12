import { IHashProvider } from 'src/lib/common/domain/services/IHash.service';
import { IUser, IUserCreate } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';
import {
  IMailerService,
  TEMPLATE_MAIL,
} from './../../../common/domain/services/IMailer.service';

export class CreateUserUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly hashProvider: IHashProvider,
    private readonly mailerService: IMailerService,
  ) {}

  async run(data: IUserCreate): Promise<IUser> {
    const newPassowrd = this.hashProvider.encrypt(data.auth.password);
    data.auth.password = newPassowrd;
    const newUser = await this.userService.create(data);
    await this.mailerService.sendEmail({
      subject: 'Bienvenido a IHealth',
      template: TEMPLATE_MAIL.WELCOME,
      to: data.auth.email,
    });
    return newUser;
  }
}
