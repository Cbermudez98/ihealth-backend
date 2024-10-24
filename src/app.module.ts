import { Module } from '@nestjs/common';
import { FooBarModule } from './lib/foo-bar/infrastructure/foo-bar.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, FooBarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
