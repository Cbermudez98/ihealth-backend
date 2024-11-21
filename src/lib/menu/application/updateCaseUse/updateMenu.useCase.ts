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
    // Buscar el menú existente por ID
    const menu = await this.menuService.getMenuById(id);
    if (!menu) {
      throw new NotFoundError('Menu not found');
    }

    // Actualizar los campos con los datos proporcionados
    menu.name = menuUpdateDto.name || menu.name;
    menu.icon = menuUpdateDto.icon || menu.icon;
    menu.route = menuUpdateDto.route || menu.route;

    // Actualizar los roles si se proporcionan
    if (menuUpdateDto.roles) {
      // Validar si los roles existen
      const rolesEntities: Role[] = [];
      for (const role of menuUpdateDto.roles) {
        const roleEntity = await this.roleService.get(role.id);
        if (!roleEntity) {
          throw new NotFoundError(`Role does not exist`);
        }
        rolesEntities.push(roleEntity);
      }
      // Asignar los roles actualizados al menú
      menu.roles = rolesEntities;
    }

    // Llamar al servicio para guardar los cambios
    await this.menuService.update(id, menuUpdateDto);

    return true;
  }
}
