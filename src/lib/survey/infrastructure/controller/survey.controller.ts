import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateSurveyUseCase } from '../../application/createSurvey/CreateSurvey.useCase';
import { GetSurveyUseCase } from '../../application/getSurvey/GetSurvey.useCase';
import { UpdateSurveyUseCase } from '../../application/updateSurvey/UpdateSurvey.useCase';
import { SurveyDto } from '../dtos/survey.dto';
import { ResponseAdapter } from 'src/common/response-adapter/response.adapter';
import { HTTP_RESPONSE_MESSAGE } from 'src/common/constants/http-message';
import { SurveyUpdate } from '../dtos/survey-update.dto';
import { RoleGuard } from 'src/lib/auth/infrastructure/guard/role/role.guard';
import { JwtAuthGuard } from 'src/lib/auth/infrastructure/guard/jwt/jwt-auth.guard';
import { Roles } from 'src/lib/role/infrastructure/decorator/role.decorator';
import { ROLES } from 'src/common/constants/roles.enum';

@Controller('survey')
export class SurveyController {
  constructor(
    @Inject('CreateSurveyUseCase')
    private readonly createSurveyUseCase: CreateSurveyUseCase,
    @Inject('GetSurveyUseCase')
    private readonly getSurveyUseCase: GetSurveyUseCase,
    @Inject('UpdateSurveyUseCase')
    private readonly updateSurveyUseCase: UpdateSurveyUseCase,
  ) {}

  // TODO: Add decorators
  @Post()
  public async createSurvey(@Body() SurveyDto: SurveyDto) {
    const survey = await this.createSurveyUseCase.run(SurveyDto);
    return ResponseAdapter.set(
      HttpStatus.CREATED,
      survey,
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Get()
  public async getSurvey(@Param('id') id: number) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getSurveyUseCase.run(id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.COORDINATOR)
  @Patch('/:id')
  public async updateSurvey(
    @Param('id') id: number,
    @Body() SurveyDto: SurveyDto,
  ) {
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.updateSurveyUseCase.run(id, SurveyDto),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true,
    );
  }
}
