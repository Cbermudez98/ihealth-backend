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

  // Método para enviar un correo electrónico
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
}
