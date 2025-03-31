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
  ParseIntPipe,
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
import { CONSTANTS } from 'src/common/constants/constants';
import { MenuUpdateDto } from '../dtos/menu-update.dto';

@Controller('menu')
export class MenuController {
  constructor(
    @Inject(CONSTANTS.USE_CASES.GET_MENU_USE_CASE)
    private readonly getMenuUseCase: GetMenuUseCase,
    @Inject(CONSTANTS.USE_CASES.ADD_ITEM_MENU_USE_CASE)
    private readonly addMenuItemUseCase: AddItemUseCase,
    @Inject(CONSTANTS.USE_CASES.UPDATE_MENU_USE_CASE)
    private readonly updateMenuUseCase: UpdateMenuUseCase,
    @Inject(CONSTANTS.USE_CASES.DELETE_MENU_USE_CASE)
    private readonly deleteMenuUseCase: DeleteMenuUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Post()
  public async createMenu(
    @Body() menuDto: MenuDto,
    @Headers('authorization') authHeader: string,
  ) {
    const newMenu = await this.addMenuItemUseCase.run(menuDto);

    return ResponseAdapter.set(
      HttpStatus.CREATED,
      newMenu,
      'Menu created successfully',
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN)
  @Patch(':menuId')
  public async updateMenu(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() menuDto: MenuUpdateDto,
    @Req() req: Request,
  ) {
    const updatedMenu = await this.updateMenuUseCase.run(menuId, menuDto);

    return ResponseAdapter.set(
      HttpStatus.OK,
      updatedMenu,
      'Menu updated successfully',
      true,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER)
  @Get()
  public async getMenus(@Req() request: Request) {
    const jwt_payload: ITokenPayload = request[KEYS.USER];
    const menus = await this.getMenuUseCase.run(jwt_payload.role);

    return ResponseAdapter.set(
      HttpStatus.OK,
      menus,
      'Menus retrieved successfully',
      true,
    );
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
