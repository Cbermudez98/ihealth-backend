import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('mail') private readonly mailQueue: Queue,
  ) {}

  async sendEmail(to: string, subject: string, template: string, context: any) {
    return await this.mailQueue.add({
      to,
      subject,
      template,
      context,
    });
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

  async sendWelcomeEmail(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Bienvenido a IHealth!',
      template: './welcome',
      context: {
        name,
      },
    });
  }
}
