import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bull';
import { mailBullConfig } from 'src/config/mail';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailQueue } from './mail.queue';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const bullModule = BullModule.forRoot(mailBullConfig);
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
          user: process.env.MAIL_NOTIFIER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.MAIL_FROM,
      },
      template: {
        dir: './src/shared/templates/email',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.forRoot(mailBullConfig),
    BullModule.registerQueue({ name: 'mail' }),
  ],
  controllers: [MailController],
  providers: [MailService, MailQueue],
  exports: [bullModule, MailService],
})
export class MailModule {}
