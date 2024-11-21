import { Injectable } from '@nestjs/common';
import { IMenuService } from '../../domain/service/IMenu.service';
import { IMenu, IMenuAdd, IMenuUpdate } from '../../domain/interfaces/IMenu';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entity/menu.entity';
import { Role } from 'src/lib/role/infrastructure/entity/role.entity';
import { In, Repository } from 'typeorm';
import { IRole } from 'src/lib/role/domain/interfaces/IRole';

@Injectable()
export class MenuService implements IMenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async addItem(menuData: IMenuAdd): Promise<IMenu> {
    const roles = await this.roleRepository.find({
      where: {
        id: In(menuData.roles),
      },
    });

    if (roles.length !== menuData.roles.length) {
      throw new Error('Some roles were not found');
    }

    const newMenuItem = this.menuRepository.create({
      name: menuData.name,
      icon: menuData.icon,
      route: menuData.route,
      roles,
    });

    return await this.menuRepository.save(newMenuItem);
  }

  update: (id: number, item: IMenuUpdate) => Promise<boolean>;

  async getMenu(roleId: IRole['id']): Promise<IMenu[]> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['menus'],
    });

    if (!role) {
      return [];
    }
    console.log(role.menus);
    return role.menus;
  }
}
