import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ResponseAdapter } from 'src/common/response-adapter/response.adapter';
import { GetAllRolesUseCase } from '../../application/getAllRoles/GetAllRoles.useCase';
import { HTTP_RESPONSE_MESSAGE } from 'src/common/constants/http-message';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject('GetAllRolesUseCase')
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
