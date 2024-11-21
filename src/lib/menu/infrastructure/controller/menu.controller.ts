import {
  Controller,
  Get,
  UnauthorizedException,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { GetMenuUseCase } from '../../application/getMenuCaseUse/GetMenu.useCase';
import * as jwt from 'jsonwebtoken';
import { MenuDto } from '../dtos/menu.dto';
import { AddItemUseCase } from '../../application/addItemCaseUse/AddItem.useCase';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly getMenuUseCase: GetMenuUseCase,
    private readonly addMenuItemUseCase: AddItemUseCase,
  ) {}

  @Get()
  async getMenu(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(token);
      throw new UnauthorizedException('Invalid or expired token');
    }

    const roleId = decodedToken?.roleId;
    if (!roleId) {
      throw new UnauthorizedException('Role ID not found in token');
    }

    return this.getMenuUseCase.run(roleId);
  }

  @Post()
  async addItem(
    @Body() createMenuItemDto: MenuDto,
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];

    let decodedToken: any;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return this.addMenuItemUseCase.run(createMenuItemDto);
  }
}
