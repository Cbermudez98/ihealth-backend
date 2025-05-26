import { RoleService } from './../role/infrastructure/service/role.service';
import { JwtAuthGuard } from './../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { JwtProvider } from '../../shared/providers/jwt.provider/jwt.provider';
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
import { SharedModule } from '../../shared/shared.module';
import { CONSTANTS } from '../../common/constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Cause, Reason, Role]), SharedModule],
  controllers: [CauseController],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.CAUSE_SERVICE,
      useClass: CauseService,
    },
    {
      provide: CONSTANTS.USE_CASES.CREATE_CAUSE_USE_CASE,
      useFactory: (causeService: ICauseService) =>
        new CreateCauseUseCase(causeService),
      inject: [CONSTANTS.PROVIDERS.CAUSE_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.UPDATE_CAUSE_USE_CASE,
      useFactory: (causeService: ICauseService) =>
        new UpdateCauseUseCase(causeService),
      inject: [CONSTANTS.PROVIDERS.CAUSE_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_CAUSE_BY_REASON_USE_CASE,
      useFactory: (causeService: ICauseService) =>
        new GetCauseByReasonUseCase(causeService),
      inject: [CONSTANTS.PROVIDERS.CAUSE_SERVICE],
    },
  ],
  exports: [CONSTANTS.PROVIDERS.CAUSE_SERVICE],
})
export class CauseModule {}
