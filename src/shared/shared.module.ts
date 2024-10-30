import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailModule } from './mail/mail.module';
import path from 'path';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { MailQueue } from './mail/mail.queue';
import { BullModule } from '@nestjs/bull';
import { mailBullConfig } from '../config/mail';

const bullModule = BullModule.forRoot(mailBullConfig);
@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://santiago.lopezmarmolejo@unicolombo.edu.co:passEricarsan123@smtp.unicolombo.edu.co',
      defaults: {
        from: '"IHealth" <santiago.lopezmarmolejo@unicolombo.edu.co>',
      },
      template: {
        dir: __dirname + '/templates/email/welcome.pug',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: path.join(process.env.PWD, '/templates/email/welcome.pug'),
          options: {
            strict: true,
          },
        },
      },
    }),
    MailModule,
    BullModule,
  ],
  controllers: [MailController],
  providers: [MailService, MailQueue],
  exports: [bullModule],
})
export class SharedModule {}
