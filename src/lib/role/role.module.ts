import { Module } from '@nestjs/common';
import { RoleController } from './infrastructure/controller/controller.controller';
import { RoleService } from './infrastructure/service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './infrastructure/entity/role.entity';
import { RoleSeeder } from './../../seeds/role.seeder';
import { GetAllRolesUseCase } from './application/getAllRoles/GetAllRoles.useCase';
import { IRoleService } from './domain/service/IRole.service';
import { Menu } from '../menu/infrastructure/entity/menu.entity';
import { CONSTANTS } from 'src/common/constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Menu])],
  controllers: [RoleController],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.ROLE_SERVICE,
      useClass: RoleService,
    },
    {
      provide: CONSTANTS.USE_CASES.GET_ALL_ROLES_USE_CASE,
      useFactory: (roleService: IRoleService) =>
        new GetAllRolesUseCase(roleService),
      inject: [CONSTANTS.PROVIDERS.ROLE_SERVICE],
    },
    RoleSeeder,
  ],
  exports: [CONSTANTS.PROVIDERS.ROLE_SERVICE],
})
export class RoleModule {}
