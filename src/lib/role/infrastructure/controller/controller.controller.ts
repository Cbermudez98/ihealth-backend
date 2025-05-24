import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ResponseAdapter } from '../../../../common/response-adapter/response.adapter';
import { GetAllRolesUseCase } from '../../application/getAllRoles/GetAllRoles.useCase';
import { HTTP_RESPONSE_MESSAGE } from '../../../../common/constants/http-message';
import { CONSTANTS } from '../../../../common/constants/constants';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(CONSTANTS.USE_CASES.GET_ALL_ROLES_USE_CASE)
    private readonly getAllRolesUseCase: GetAllRolesUseCase,
  ) {}
  @Get()
  async getAllRoles() {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getAllRolesUseCase.run(),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
