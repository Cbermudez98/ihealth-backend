import { RoleService } from './../role/infrastructure/service/role.service';
import { JwtAuthGuard } from './../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';
import { Module } from '@nestjs/common';
import { CauseController } from './infrastructure/controller/cause.controller';
import { CauseService } from './infrastructure/service/cause.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cause } from './infrastructure/entity/cause.entity';
import { ICauseService } from './domain/service/ICause.service';
import { CreateCauseUseCase } from './application/createCauseUseCase/CreateCause.useCase';
import { Reason } from '../reason/infrastructure/entity/reason.entity';
import { UpdateCauseUseCase } from './application/updateCauseUseCase/UpdateCause.useCase';
import { GetCauseByReasonUseCase } from './application/getCauseByReasonUseCase/GetCause.useCase';
import { Role } from '../role/infrastructure/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cause, Reason, Role])],
  controllers: [CauseController],
  providers: [
    {
      provide: 'CauseService',
      useClass: CauseService,
    },
    {
      provide: 'CreateCauseUseCase',
      useFactory: (causeService: ICauseService) =>
        new CreateCauseUseCase(causeService),
      inject: ['CauseService'],
    },
    {
      provide: 'UpdateCauseUseCase',
      useFactory: (causeService: ICauseService) =>
        new UpdateCauseUseCase(causeService),
      inject: ['CauseService'],
    },
    {
      provide: 'GetCauseByReasonUseCase',
      useFactory: (causeService: ICauseService) =>
        new GetCauseByReasonUseCase(causeService),
      inject: ['CauseService'],
    },
    RoleService,
    JwtAuthGuard,
    JwtProvider,
  ],
})
export class CauseModule {}
