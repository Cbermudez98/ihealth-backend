import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { HashProvider } from './providers/hash.provider/hash.provider';

@Module({
  imports: [MailModule],
  providers: [HashProvider],
})
export class SharedModule {}
