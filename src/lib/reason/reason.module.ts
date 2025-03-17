import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReasonController } from './infrastructure/controller/reason.controller';
import { ReasonService } from './infrastructure/service/reason.service';
import { Reason } from './infrastructure/entity/reason.entity';
import { IReasonService } from './domain/service/IReason.service';
import { CreateReasonUseCase } from './application/createReason/CreateReason.useCase';
import { GetReasonUseCase } from './application/getReason/GetReason.useCase';
import { GetReasonsUseCase } from './application/getReasons/GetReasons.useCase';
import { UpdateReasonUseCase } from './application/updateReason/UpdateReason.useCase';
import { Role } from '../role/infrastructure/entity/role.entity';
import { ReasonAndCauseSeeder } from './../../seeds/reasonAndCauses.seeder';
import { Cause } from '../cause/infrastructure/entity/cause.entity';
import { CONSTANTS } from 'src/common/constants/constants';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reason, Role, Cause]), SharedModule],
  controllers: [ReasonController],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.REASON_SERVICE,
      useClass: ReasonService,
    },
    {
      provide: CONSTANTS.USE_CASES.GET_REASONS_USE_CASE,
      useFactory: (reasonService: IReasonService) =>
        new GetReasonsUseCase(reasonService),
      inject: [CONSTANTS.PROVIDERS.REASON_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.CREATE_REASON_USE_CASE,
      useFactory: (reasonService: IReasonService) =>
        new CreateReasonUseCase(reasonService),
      inject: [CONSTANTS.PROVIDERS.REASON_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_REASON_USE_CASE,
      useFactory: (reasonService: IReasonService) =>
        new GetReasonUseCase(reasonService),
      inject: [CONSTANTS.PROVIDERS.REASON_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.UPDATE_REASON_USE_CASE,
      useFactory: (reasonService: IReasonService) =>
        new UpdateReasonUseCase(reasonService),
      inject: [CONSTANTS.PROVIDERS.REASON_SERVICE],
    },
    ReasonAndCauseSeeder,
  ],
  exports: [CONSTANTS.PROVIDERS.REASON_SERVICE],
})
export class ReasonModule {}
