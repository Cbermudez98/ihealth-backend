import { IMenu, IMenuUpdate } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';
import { IRoleService } from '../../../role/domain/service/IRole.service';
import { NotFoundException } from '@nestjs/common';

export class UpdateMenuUseCase {
  constructor(
    private readonly menuService: IMenuService,
    private readonly roleService: IRoleService,
  ) {}

  async run(menuId: number, menuDto: Partial<IMenuUpdate>): Promise<IMenu> {
    const menu = await this.menuService.getMenuById(menuId);
    if (!menu) {
      throw new NotFoundException(`Menu not found`);
    }

    const updatedMenu = await this.menuService.updateItems(menuId, menuDto);
    return updatedMenu;
  }
}