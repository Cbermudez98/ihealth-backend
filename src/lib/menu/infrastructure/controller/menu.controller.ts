import {
  Controller,
  UnauthorizedException,
  Headers,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { GetMenuUseCase } from '../../application/getMenuCaseUse/GetMenu.useCase';
import * as jwt from 'jsonwebtoken';
import { MenuDto } from '../dtos/menu.dto';
import { AddItemUseCase } from '../../application/addItemCaseUse/AddItem.useCase';
import { UpdateMenuUseCase } from '../../application/updateCaseUse/updateMenu.useCase';

import { IMenuUpdate } from '../../domain/interfaces/IMenu';
import { ResponseAdapter } from 'src/common/response-adapter/response.adapter';

@Controller('menu')
export class MenuController {
  constructor(
    @Inject('GetMenuUseCase')
    private readonly getMenuUseCase: GetMenuUseCase,
    @Inject('AddItemUseCase')
    private readonly addMenuItemUseCase: AddItemUseCase,
    @Inject('UpdateMenuUseCase')
    private readonly updateMenuUseCase: UpdateMenuUseCase,
  ) {}

  @Post()
  public async createMenu(@Body() menuDto: MenuDto) {
    try {
      const newMenu = await this.addMenuItemUseCase.run(menuDto);

      return ResponseAdapter.set(
        HttpStatus.CREATED,
        newMenu,
        'Menu created successfully',
        true,
      );
    } catch (error) {
      console.error('Error in MenuController: ', error);
      return ResponseAdapter.set(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        'Something went wrong on our end.',
        false,
      );
    }
  }

  @Patch(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() menuUpdateData: IMenuUpdate,
    @Headers('authorization') authHeader: string,
  ) {
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
      throw new UnauthorizedException('Invalid or expired token');
    }

    return this.updateMenuUseCase.run(id, menuUpdateData, decodedToken);
  }
}
