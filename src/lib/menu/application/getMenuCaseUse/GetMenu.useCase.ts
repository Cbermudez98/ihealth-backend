import { Injectable, NotFoundException } from '@nestjs/common';
import { IMenu } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';

@Injectable()
export class GetMenuUseCase {
  constructor(private readonly menuService: IMenuService) {}

  async run(role: string): Promise<IMenu[]> {
    const menus = await this.menuService.getMenus(role);

    if (!menus || menus.length === 0) {
      throw new NotFoundException('No menus found for role');
    }

    return menus;
  }
}
