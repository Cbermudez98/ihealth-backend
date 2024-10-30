import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(
    @Body()
    body: {
      to: string;
      subject: string;
      template: string;
      context: any;
    },
  ) {
    const { to, subject, template, context } = body;
    await this.mailService.sendEmail(to, subject, template, context);
    return { message: 'Email sent successfully' };
  }
}
