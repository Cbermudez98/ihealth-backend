import { Module } from '@nestjs/common';
import { MenuController } from './infrastructure/controller/menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/infrastructure/entity/role.entity';
import { MenuService } from './infrastructure/service/menu.service';

@Module({
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [
    {
      provide: 'MenuService',
      useClass: MenuService,
    },
  ],
})
export class MenuModule {}
