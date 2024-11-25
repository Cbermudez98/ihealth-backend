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
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GetMenuUseCase } from '../../application/getMenuCaseUse/GetMenu.useCase';
import { MenuDto } from '../dtos/menu.dto';
import { AddItemUseCase } from '../../application/addItemCaseUse/AddItem.useCase';
import { UpdateMenuUseCase } from '../../application/updateCaseUse/UpdateMenu.useCase';

import { IMenuUpdate } from '../../domain/interfaces/IMenu';
import { ResponseAdapter } from 'src/common/response-adapter/response.adapter';
import { DeleteMenuUseCase } from '../../application/deleteMenuCaseUse/DeleteMenu.useCase';
import { JwtAuthGuard } from 'src/lib/auth/infrastructure/guard/jwt/jwt-auth.guard';
import { RoleGuard } from 'src/lib/auth/infrastructure/guard/role/role.guard';
import { ROLES } from 'src/common/constants/roles.enum';
import { Roles } from 'src/lib/role/infrastructure/decorator/role.decorator';
import { ITokenPayload } from 'src/lib/auth/infrastructure/interfaces/IToken';
import { KEYS } from 'src/common/constants/keys';

@Controller('menu')
export class MenuController {
  constructor(
    @Inject('GetMenuUseCase')
    private readonly getMenuUseCase: GetMenuUseCase,
    @Inject('AddItemUseCase')
    private readonly addMenuItemUseCase: AddItemUseCase,
    @Inject('UpdateMenuUseCase')
    private readonly updateMenuUseCase: UpdateMenuUseCase,
    @Inject('DeleteMenuUseCase')
    private readonly deleteMenuUseCase: DeleteMenuUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Post()
  public async createMenu(
    @Body() menuDto: MenuDto,
    @Headers('authorization') authHeader: string,
  ) {
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

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Patch(':menuId')
  public async updateMenu(
    @Param('menuId') menuId: number,
    @Body() menuDto: IMenuUpdate,
    @Req() req: Request,
  ) {
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

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Get()
  public async getMenus(@Req() request: Request) {
    try {
      const jwt_payload: ITokenPayload = request[KEYS.USER];
      const menus = await this.getMenuUseCase.run(jwt_payload.role);

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

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Delete(':menuId')
  public async deleteMenu(
    @Param('menuId') menuId: number,
    @Req() request: Request,
  ) {
    try {
      await this.deleteMenuUseCase.run(menuId);
      return ResponseAdapter.set(
        HttpStatus.OK,
        null,
        'Menu deleted successfully',
        true,
      );
    } catch (error) {
      console.error('Error in MenuController:', error);
      return ResponseAdapter.set(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        'Something went wrong while deleting the menu.',
        false,
      );
    }
  }
}
