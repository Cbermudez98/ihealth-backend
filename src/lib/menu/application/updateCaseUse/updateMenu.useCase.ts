import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';
import { IMenuUpdate } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';
import { Role } from '../../../role/infrastructure/entity/role.entity';
import { IRoleService } from '../../../role/domain/service/IRole.service';

export class UpdateMenuUseCase {
  constructor(
    private readonly menuService: IMenuService,
    private readonly roleService: IRoleService,
  ) {}

  async run(id: number, menuUpdateDto: IMenuUpdate, decodedToken: any) {
    const menu = await this.menuService.getMenuById(id);
    if (!menu) {
      throw new NotFoundError('Menu not found');
    }

    menu.name = menuUpdateDto.name || menu.name;
    menu.icon = menuUpdateDto.icon || menu.icon;
    menu.route = menuUpdateDto.route || menu.route;

    if (menuUpdateDto.roles) {
      const rolesEntities: Role[] = [];
      for (const role of menuUpdateDto.roles) {
        const roleEntity = await this.roleService.get(role.id);
        if (!roleEntity) {
          throw new NotFoundError(`Role does not exist`);
        }
        rolesEntities.push(roleEntity);
      }
      menu.roles = rolesEntities;
    }

    await this.menuService.updateItems(id, menuUpdateDto);

    return true;
  }
}
