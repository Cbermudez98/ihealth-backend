import {
  Body,
  Controller,
  HttpStatus,
  Inject,
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

@Controller('user')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  public async createUser(@Body() UserDto: UserDto) {
    console.log('UserDto', UserDto);
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
  @Patch()
  public async updateUser(@Body() user: UserUpdateDto) {
    return user;
  }
}
