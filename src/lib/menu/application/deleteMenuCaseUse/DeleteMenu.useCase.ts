import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IMenu } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';

@Injectable()
export class DeleteMenuUseCase {
  constructor(private readonly menuService: IMenuService) {}

  async run(menuId: IMenu['id']): Promise<void> {
    let menu: IMenu | null;

    try {
      menu = await this.menuService.getMenuById(menuId);
    } catch (error) {
      console.error('Error retrieving menu for deletion:', error);
      throw new NotFoundException('Menu not found');
    }

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    try {
      await this.menuService.deleteMenu(menuId);
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw new ForbiddenException('Could not delete menu');
    }
  }
}
