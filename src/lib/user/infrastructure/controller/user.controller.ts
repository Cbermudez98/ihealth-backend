import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/createUser/CreateUser.useCase';
import { UserDto } from '../dtos/user.dto';
import { ResponseAdapter } from './../../../../common/response-adapter/response.adapter';
import { HTTP_RESPONSE_MESSAGE } from 'src/common/constants/http-message';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { JwtAuthGuard } from './../../../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { Roles } from './../../../role/infrastructure/decorator/role.decorator';
import { ROLES } from './../../../../common/constants/roles.enum';
import { RoleGuard } from './../../../auth/infrastructure/guard/role/role.guard';
import { UpdateUserUseCase } from '../../application/updateUser/UpdateUser.useCase';
import { GetUserUseCase } from '../../application/getUSer/GetUser.useCase';

@Controller('user')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('UpdateUserUseCase')
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject('GetUserUseCase')
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Get('/:id')
  public async getUser(@Param('id', ParseIntPipe) id: number) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getUserUseCase.run(id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @Post()
  public async createUser(@Body() UserDto: UserDto) {
    const newUser = await this.createUserUseCase.run(UserDto);
    return ResponseAdapter.set(
      HttpStatus.CREATED,
      newUser,
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Patch('/:id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDto,
  ) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.updateUserUseCase.run(id, user),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
