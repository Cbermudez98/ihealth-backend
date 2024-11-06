import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import {
  IMail,
  IMailerService,
  TEMPLATE_MAIL,
} from './../../lib/common/domain/services/IMailer.service';

@Injectable()
export class MailService implements IMailerService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('mail') private readonly mailQueue: Queue,
  ) {}

  async sendEmail(mail: IMail): Promise<boolean> {
    try {
      const template = this.getTemplate(mail.template);
      await this.mailQueue.add({
        to: mail.to,
        subject: mail.subject,
        template: template,
        context: {},
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async processEmail(job: Job) {
    const { to, subject, template, context } = job.data;

    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }

  private getTemplate(template: TEMPLATE_MAIL): string {
    return {
      [TEMPLATE_MAIL.WELCOME]: './welcome',
      '': '',
    }[template];
  }
}
