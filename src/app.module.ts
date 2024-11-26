import { Module } from '@nestjs/common';
import { FooBarModule } from './lib/foo-bar/infrastructure/foo-bar.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './lib/user/user.module';
import { SharedModule } from './shared/shared.module';
import { CareerModule } from './lib/career/infrastructure/career.module';
import { AuthModule } from './lib/auth/auth.module';
import { RoleModule } from './lib/role/role.module';
import { SurveyModule } from './lib/survey/survey.module';
import { ServiceService } from './lib/survey/infrastructure/service/survey.service';
import { SurveyController } from './lib/survey/infrastructure/controller/survey.controller';

@Module({
  imports: [
    CoreModule,
    FooBarModule,
    UserModule,
    SharedModule,
    CareerModule,
    AuthModule,
    RoleModule,
    SurveyModule,
  ],
  controllers: [SurveyController],
  providers: [ServiceService],
})
export class AppModule {}
