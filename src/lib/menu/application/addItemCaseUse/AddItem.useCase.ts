import { NotFoundError } from 'rxjs';
import { IMenu, IMenuAdd } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';

export class AddItemUseCase {
  constructor(private readonly menuService: IMenuService) {}

  async run(data: IMenuAdd): Promise<IMenu> {
    const newMenuItem = await this.menuService.addItem(data);

    if (!newMenuItem) {
      throw new NotFoundError('Menu item could not be created');
    }

    return newMenuItem;
  }
}
