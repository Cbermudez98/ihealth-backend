import { Injectable } from '@nestjs/common';
import { IMenu, IMenuAdd } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';
import { RequestTimeoutException } from '@nestjs/common/exceptions/request-timeout.exception';

@Injectable()
export class AddItemUseCase {
  constructor(private readonly menuService: IMenuService) {}

  async run(data: IMenuAdd): Promise<IMenu> {
    let newMenuItem: IMenu;

    try {
      if (!this.menuService) {
        throw new Error('MenuService is not defined');
      }

      newMenuItem = await this.menuService.createItem(data);
    } catch (error) {
      console.error('Error creating menu item: ', error);
      throw new RequestTimeoutException('Error creating menu item', {
        description: 'Something went wrong when creating the menu item',
      });
    }

    return newMenuItem;
  }
}
