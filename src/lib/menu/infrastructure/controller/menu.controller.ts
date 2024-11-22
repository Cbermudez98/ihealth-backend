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
  ForbiddenException,
  Get,
  Req,
} from '@nestjs/common';
import { GetMenuUseCase } from '../../application/getMenuCaseUse/GetMenu.useCase';
import * as jwt from 'jsonwebtoken';
import { MenuDto } from '../dtos/menu.dto';
import { AddItemUseCase } from '../../application/addItemCaseUse/AddItem.useCase';
import { UpdateMenuUseCase } from '../../application/updateCaseUse/UpdateMenu.useCase';

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
  public async createMenu(
    @Body() menuDto: MenuDto,
    @Headers('authorization') authHeader: string,
  ) {
    try {
      const token = authHeader.split(' ')[1];

      console.log(token);
      let decodedToken: any;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      if (decodedToken.role !== 'admin') {
        throw new ForbiddenException(
          'You do not have permission to perform this action',
        );
      }

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

  @Patch(':menuId')
  public async updateMenu(
    @Param('menuId') menuId: number,
    @Body() menuDto: IMenuUpdate,
    @Headers('authorization') authHeader: string,
    @Req() req: Request,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    let decodedToken: any;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (decodedToken.role !== 'admin') {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    try {
      const updatedMenu = await this.updateMenuUseCase.run(menuId, menuDto);

      return ResponseAdapter.set(
        HttpStatus.OK,
        updatedMenu,
        'Menu updated successfully',
        true,
      );
    } catch (error) {
      console.error('Error updating menu: ', error);
      return ResponseAdapter.set(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        'Something went wrong during the update process',
        false,
      );
    }
  }

  @Get()
  public async getMenus(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];
    let decodedToken: any;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.error('Invalid token:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }

    const role = decodedToken.role;

    if (!role) {
      throw new UnauthorizedException('Role not found in token');
    }

    try {
      const menus = await this.getMenuUseCase.run(role);

      return ResponseAdapter.set(
        HttpStatus.OK,
        menus,
        'Menus retrieved successfully',
        true,
      );
    } catch (error) {
      console.error('Error in MenuController:', error);
      return ResponseAdapter.set(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        'Error retrieving menus',
        false,
      );
    }
  }
}
