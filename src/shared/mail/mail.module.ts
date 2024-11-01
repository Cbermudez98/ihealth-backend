import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bull';
import { mailBullConfig } from 'src/config/mail';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailQueue } from './mail.queue';

const bullModule = BullModule.forRoot(mailBullConfig);
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'healthprueba@gmail.com',
          pass: 'tptfsttyiyqyikyi',
        },
      },
      defaults: {
        from: '"IHealth" <ihealthprueba@gmail.com>',
      },
      template: {
        dir: './src/shared/templates/email',
        adapter: new PugAdapter(),
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
