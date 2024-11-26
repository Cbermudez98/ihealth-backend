import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Patch,
  Post,
  Req,
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
import { Request } from 'express';
import { KEYS } from 'src/common/constants/keys';
import { ITokenPayload } from 'src/lib/auth/infrastructure/interfaces/IToken';
import { GetPsycologistUseCase } from '../../application/getPsycologist/GetPsycologist.useCase';
import { GetAllUsersUseCase } from '../../application/getAllUsers/GetAllUsers.useCase';

@Controller('user')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('UpdateUserUseCase')
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject('GetUserUseCase')
    private readonly getUserUseCase: GetUserUseCase,
    @Inject('GetPsycologistUseCase')
    private readonly getPsycologistUseCase: GetPsycologistUseCase,
    @Inject('GetAllUsersUseCase')
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get()
  public async getUser(@Req() request: Request) {
    const auth: ITokenPayload = request[KEYS.USER] as ITokenPayload;
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getUserUseCase.run(auth.id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get('psychologist')
  public async getPsycologist() {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getPsycologistUseCase.run(),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get('all')
  public async getAll() {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getAllUsersUseCase.run(),
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
  @Patch()
  public async updateUser(@Body() user: UserUpdateDto, @Req() req: Request) {
    const token: ITokenPayload = req[KEYS.USER] as ITokenPayload;
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.updateUserUseCase.run(token.id, user),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
