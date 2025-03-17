import { Queue } from 'bull';
import { BullService } from './bull.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { getQueueToken } from '@nestjs/bull';

describe('BullService', () => {
  let service: BullService;
  let mailQueue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BullService,
        {
          provide: MailerService,
          useValue: {},
        },
        {
          provide: getQueueToken('mail'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BullService>(BullService);
    mailQueue = module.get<Queue>(getQueueToken('mail'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a job to the queue', async () => {
    const emailData = {
      to: 'test@example.com',
      subject: 'Test',
      body: 'Test email',
    };

    await service.sendEmail(emailData);

    expect(mailQueue.add).toHaveBeenCalledWith(emailData);
  });
});
