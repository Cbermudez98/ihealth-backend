import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Queue, Job } from 'bull';

describe('MailService', () => {
  let service: MailService;
  let mailerService: MailerService;
  let mailQueue: Queue;

  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
  };

  const mockMailQueue = {
    add: jest.fn().mockResolvedValue({ id: 'test-job-id' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
        {
          provide: 'BullQueue_mail',
          useValue: mockMailQueue,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
    mailQueue = module.get<Queue>('BullQueue_mail');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send email successfully', async () => {
    const emailData = {
      to: 'test@example.com',
      subject: 'Test Subject',
      template: 'welcome',
      context: { name: 'Test User' },
    };

    const result = await service.sendEmail(
      emailData.to,
      emailData.subject,
      emailData.template,
      emailData.context,
    );

    expect(mailQueue.add).toHaveBeenCalledWith({
      to: emailData.to,
      subject: emailData.subject,
      template: emailData.template,
      context: emailData.context,
    });
    expect(result).toEqual({ id: 'test-job-id' });
  });

  it('should process email successfully', async () => {
    const job: Job = {
      id: 'test-job-id',
      data: {
        to: 'test@example.com',
        subject: 'Test Subject',
        template: 'welcome',
        context: { name: 'Test User' },
      },
      attempts: 0,
      moveToCompleted: jest.fn(),
      update: jest.fn(),
    } as any;

    await service.processEmail(job);

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: job.data.to,
      subject: job.data.subject,
      template: job.data.template,
      context: job.data.context,
    });
  });
});
