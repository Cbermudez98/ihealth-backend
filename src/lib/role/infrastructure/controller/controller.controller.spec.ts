import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './controller.controller';
import { CONSTANTS } from './../../../../common/constants/constants';
import { IRoleService } from '../../domain/service/IRole.service';
import { GetAllRolesUseCase } from '../../application/getAllRoles/GetAllRoles.useCase';

describe('ControllerController', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: CONSTANTS.USE_CASES.GET_ALL_ROLES_USE_CASE,
          useFactory: (roleService: IRoleService) =>
            new GetAllRolesUseCase(roleService),
          inject: [CONSTANTS.PROVIDERS.ROLE_SERVICE],
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
