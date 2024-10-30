import { Module } from '@nestjs/common';
import { FooBarModule } from './lib/foo-bar/infrastructure/foo-bar.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './lib/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CoreModule, FooBarModule, UserModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
