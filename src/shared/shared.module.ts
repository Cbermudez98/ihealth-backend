import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { HashProvider } from './providers/hash.provider/hash.provider';
import { JwtProvider } from './providers/jwt.provider/jwt.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MailModule],
  providers: [HashProvider, JwtProvider, JwtService],
})
export class SharedModule {}
