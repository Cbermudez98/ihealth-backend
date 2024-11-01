import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BullService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('mail') private readonly mailQueue: Queue,
  ) {}

  async sendEmail(emailData: any) {
    await this.mailQueue.add(emailData);
  }
}
