import { Module } from '@nestjs/common';
import { RoleController } from './infrastructure/controller/controller.controller';
import { RoleService } from './infrastructure/service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './infrastructure/entity/role.entity';
import { RoleSeeder } from './../../seeds/role.seeder';
import { GetAllRolesUseCase } from './application/getAllRoles/GetAllRoles.useCase';
import { IRoleService } from './domain/service/IRole.service';
import { Menu } from '../menu/infrastructure/entity/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Menu])],
  controllers: [RoleController],
  providers: [
    {
      provide: 'RoleService',
      useClass: RoleService,
    },
    {
      provide: 'GetAllRolesUseCase',
      useFactory: (roleService: IRoleService) =>
        new GetAllRolesUseCase(roleService),
      inject: ['RoleService'],
    },
    RoleSeeder,
  ],
})
export class RoleModule {}
