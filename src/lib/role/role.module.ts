import { Module } from '@nestjs/common';
import { ControllerController } from './infrastructure/controller/controller.controller';
import { ControllerService } from './infrastructure/controller/controller.service';
import { RoleService } from './infrastructure/service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './infrastructure/entity/role.entity';
import { RoleSeeder } from './../../seeds/role.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [ControllerController],
  providers: [ControllerService, RoleService, RoleSeeder],
})
export class RoleModule {}
