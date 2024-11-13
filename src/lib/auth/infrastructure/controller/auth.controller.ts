import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthUserUseCase } from '../../application/authUser/AuthUser.useCase';
import { AuthService } from '../service/auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guard/jwt/jwt-auth.guard';
import { ResponseAdapter } from 'src/common/response-adapter/response.adapter';
import { HTTP_RESPONSE_MESSAGE } from 'src/common/constants/http-message';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthUserUseCase')
    private readonly authUSerUseCase: AuthUserUseCase,
  ) {}

  @Post()
  async login(@Body() authDto: AuthDto) {
    const response = await this.authUSerUseCase.run(authDto);
    return ResponseAdapter.set(
      HttpStatus.OK,
      response,
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
