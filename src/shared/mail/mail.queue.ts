import { Process, Processor } from '@nestjs/bull';
import { MailService } from './mail.service';
import { Job } from 'bull';

@Processor('mail')
export class MailQueue {
  constructor(private readonly mailService: MailService) {}

  @Process()
  async handleEmail(job: Job) {
    await this.mailService.processEmail(job);
  }
}
