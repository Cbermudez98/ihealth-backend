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
import { IRoleService } from '../role/domain/service/IRole.service';
import { RoleService } from '../role/infrastructure/service/role.service';

@Module({
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([Role, Menu])],
  providers: [
    {
      provide: 'MenuService',
      useClass: MenuService,
    },
    {
      provide: 'RoleService',
      useClass: RoleService,
    },
    {
      provide: 'GetMenuUseCase',
      useFactory: (menuService: IMenuService) =>
        new GetMenuUseCase(menuService),
      inject: ['MenuService'],
    },
    {
      provide: 'AddItemUseCase',
      useFactory: (menuService: IMenuService) =>
        new AddItemUseCase(menuService),
      inject: ['MenuService'],
    },
    {
      provide: 'UpdateMenuUseCase',
      useClass: UpdateMenuUseCase,
    },
  ],
})
export class MenuModule {}
