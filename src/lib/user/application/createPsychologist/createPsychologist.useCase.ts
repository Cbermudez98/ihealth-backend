import { IHashProvider } from '../../../../lib/common/domain/services/IHash.service';
import { IUser, IUserCreate } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';
import {
  IMailerService,
  TEMPLATE_MAIL,
} from '../../../../lib/common/domain/services/IMailer.service';
import { IPsychologistCreate } from '../../domain/interfaces/IPsychologist';

export class CreatePsychologistUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly hashProvider: IHashProvider,
    private readonly mailerService: IMailerService,
  ) {}

  async run(data: IPsychologistCreate): Promise<IUser> {
    const hashedPassword = this.hashProvider.encrypt(data.auth.password);
    data.auth.password = hashedPassword;

    const newPsychologist = await this.userService.createPsychologist(data);

    await this.mailerService.sendEmail({
      subject: 'Bienvenido Psicólogo a IHealth',
      template: TEMPLATE_MAIL.WELCOME,
      to: data.auth.email,
    });

    return newPsychologist;
  }
}
