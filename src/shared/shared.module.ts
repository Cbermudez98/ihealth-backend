import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { HashProvider } from './providers/hash.provider/hash.provider';
import { JwtProvider } from './providers/jwt.provider/jwt.provider';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IcsProvider } from './providers/ics.provider/ics.provider';
import { MailService } from './mail/mail.service';
import { CONSTANTS } from 'src/common/constants/constants';

const providers = [
  { provide: CONSTANTS.PROVIDERS.HASH_PROVIDER, useClass: HashProvider },
  { provide: CONSTANTS.PROVIDERS.JWT_PROVIDER, useClass: JwtProvider },
  { provide: CONSTANTS.PROVIDERS.JWT_SERVICE, useClass: JwtService },
  { provide: CONSTANTS.PROVIDERS.ICS_PROVIDER, useClass: IcsProvider },
  { provide: CONSTANTS.PROVIDERS.MAIL_SERVICE, useClass: MailService },
];

@Module({
  imports: [MailModule, JwtModule],
  providers: [...providers],
  exports: [...providers.map((provide) => provide.provide)],
})
export class SharedModule {}
