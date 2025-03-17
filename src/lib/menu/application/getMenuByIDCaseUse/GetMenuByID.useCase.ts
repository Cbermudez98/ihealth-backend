import { NotFoundException } from '@nestjs/common';
import { IMenu } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';

export class GetMenuByIDCaseUse {
  constructor(private readonly menuService: IMenuService) {}

  async run(menuId: IMenu['id']): Promise<IMenu> {
    let menu: IMenu;

    try {
      menu = await this.menuService.getMenuById(menuId);
    } catch (error) {
      console.error('Error retrieving menu by ID:', error);
      throw new NotFoundException('Menu not found');
    }

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }
}
