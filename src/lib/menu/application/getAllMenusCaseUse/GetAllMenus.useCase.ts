import { Injectable, NotFoundException } from '@nestjs/common';
import { IMenu } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';
import { Admin } from 'typeorm';

@Injectable()
export class GetAllMenuUseCase {
  constructor(private readonly menuService: IMenuService) {}

  async run(role: string): Promise<IMenu[]> {
    const menus = await this.menuService.getAllMenus();
    return menus;
  }
}
