import { Module } from '@nestjs/common';
import { ReasonController } from './infrastructure/controller/reason.controller';
import { ReasonService } from './infrastructure/service/reason.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reason } from './infrastructure/entity/reason.entity';
import { IReasonService } from './domain/service/IReason.service';
import { CreateReasonUseCase } from './application/createReason/CreateReason.useCase';
import { GetReasonUseCase } from './application/getReason/GetReason.useCase';
import { GetReasonsUseCase } from './application/getReasons/GetReasons.useCase';
import { UpdateReasonUseCase } from './application/updateReason/UpdateReason.useCase';
import { RoleService } from '../role/infrastructure/service/role.service';
import { JwtAuthGuard } from '../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';
import { Role } from '../role/infrastructure/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reason, Role])],
  controllers: [ReasonController],
  providers: [
    {
      provide: 'ReasonService',
      useClass: ReasonService,
    },
    {
      provide: 'GetReasonsUseCase',
      useFactory: (reasonService: IReasonService) =>
        new GetReasonsUseCase(reasonService),
      inject: ['ReasonService'],
    },
    {
      provide: 'CreateReasonUseCase',
      useFactory: (reasonService: IReasonService) =>
        new CreateReasonUseCase(reasonService),
      inject: ['ReasonService'],
    },
    {
      provide: 'GetReasonUseCase',
      useFactory: (reasonService: IReasonService) =>
        new GetReasonUseCase(reasonService),
      inject: ['ReasonService'],
    },
    {
      provide: 'UpdateReasonUseCase',
      useFactory: (reasonService: IReasonService) =>
        new UpdateReasonUseCase(reasonService),
      inject: ['ReasonService'],
    },
    RoleService,
    JwtAuthGuard,
    JwtProvider,
  ],
})
export class ReasonModule {}
