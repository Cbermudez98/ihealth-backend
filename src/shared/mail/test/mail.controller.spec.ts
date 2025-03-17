import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from '../mail.controller';
import { MailService } from '../mail.service';

describe('MailController', () => {
  let controller: MailController;
  let service: MailService;

  const mockMailService = {
    sendEmail: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    controller = module.get<MailController>(MailController);
    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
