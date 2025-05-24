import { Test, TestingModule } from '@nestjs/testing';
import { CauseController } from './cause.controller';
import { CONSTANTS } from './../../../../common/constants/constants';
import { CauseService } from '../service/cause.service';
import { ICauseService } from '../../domain/service/ICause.service';
import { CreateCauseUseCase } from '../../application/createCauseUseCase/CreateCause.useCase';
import { UpdateCauseUseCase } from '../../application/updateCauseUseCase/UpdateCause.useCase';
import { GetCauseByReasonUseCase } from '../../application/getCauseByReasonUseCase/GetCause.useCase';

describe('CauseController', () => {
  let controller: CauseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<CauseController>(CauseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
