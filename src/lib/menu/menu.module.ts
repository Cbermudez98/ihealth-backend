import { Module } from '@nestjs/common';
import { MenuController } from './infrastructure/controller/menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/infrastructure/entity/role.entity';
import { MenuService } from './infrastructure/service/menu.service';
import { Menu } from './infrastructure/entity/menu.entity';
import { GetMenuUseCase } from './application/getMenuCaseUse/GetMenu.useCase';
import { AddItemUseCase } from './application/addItemCaseUse/AddItem.useCase';

@Module({
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([Role, Menu])],
  providers: [
    {
      provide: 'MenuService',
      useClass: MenuService,
    },
    GetMenuUseCase,
    AddItemUseCase,
  ],
})
export class MenuModule {}
