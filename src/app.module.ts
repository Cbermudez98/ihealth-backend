import { Module } from '@nestjs/common';
import { FooBarModule } from './lib/foo-bar/infrastructure/foo-bar.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './lib/user/user.module';
import { SharedModule } from './shared/shared.module';
import { CareerModule } from './lib/career/infrastructure/career.module';
import { AuthModule } from './lib/auth/auth.module';
import { RoleModule } from './lib/role/role.module';

@Module({
  imports: [
    CoreModule,
    FooBarModule,
    UserModule,
    SharedModule,
    CareerModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
