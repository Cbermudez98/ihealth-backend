import { Module } from '@nestjs/common';
import { MenuController } from './infrastructure/controller/menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/infrastructure/entity/role.entity';
import { MenuService } from './infrastructure/service/menu.service';
import { Menu } from './infrastructure/entity/menu.entity';
import { GetMenuUseCase } from './application/getMenuCaseUse/GetMenu.useCase';
import { AddItemUseCase } from './application/addItemCaseUse/AddItem.useCase';
import { UpdateMenuUseCase } from './application/updateCaseUse/UpdateMenu.useCase';
import { IMenuService } from './domain/service/IMenu.service';
import { RoleService } from '../role/infrastructure/service/role.service';
import { GetMenuByIDCaseUse } from './application/getMenuByIDCaseUse/GetMenuByID.useCase';
import { DeleteMenuUseCase } from './application/deleteMenuCaseUse/DeleteMenu.useCase';
import { JwtAuthGuard } from '../auth/infrastructure/guard/jwt/jwt-auth.guard';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';
import { SharedModule } from 'src/shared/shared.module';
import { CONSTANTS } from 'src/common/constants/constants';
import { GetAllMenuUseCase } from './application/getAllMenusCaseUse/GetAllMenus.useCase';

@Module({
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([Role, Menu]), SharedModule],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.MENU_SERVICE,
      useClass: MenuService,
    },
    {
      provide: CONSTANTS.USE_CASES.GET_MENU_USE_CASE,
      useFactory: (menuService: IMenuService) =>
        new GetMenuUseCase(menuService),
      inject: [CONSTANTS.PROVIDERS.MENU_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.ADD_ITEM_MENU_USE_CASE,
      useFactory: (menuService: IMenuService) =>
        new AddItemUseCase(menuService),
      inject: [CONSTANTS.PROVIDERS.MENU_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_ALL_MENU_USE_CASE,
      useFactory: (menuService: IMenuService) =>
        new GetAllMenuUseCase(menuService),
      inject: [CONSTANTS.PROVIDERS.MENU_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.UPDATE_MENU_USE_CASE,
      useFactory: (menuService: IMenuService) =>
        new UpdateMenuUseCase(menuService),
      inject: [CONSTANTS.PROVIDERS.MENU_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_MENU_BY_ID_USE_CASE,
      useFactory: (menuService: IMenuService) =>
        new GetMenuByIDCaseUse(menuService),
      inject: [CONSTANTS.PROVIDERS.MENU_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.DELETE_MENU_USE_CASE,
      useFactory: (menuService: IMenuService) =>
        new DeleteMenuUseCase(menuService),
      inject: [CONSTANTS.PROVIDERS.MENU_SERVICE],
    },
  ],
})
export class MenuModule {}
