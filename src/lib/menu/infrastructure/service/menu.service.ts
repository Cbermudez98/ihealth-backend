import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IMenuService } from '../../domain/service/IMenu.service';
import { IMenu, IMenuAdd, IMenuUpdate } from '../../domain/interfaces/IMenu';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entity/menu.entity';
import { Role } from 'src/lib/role/infrastructure/entity/role.entity';
import { Repository } from 'typeorm';
import { IRole } from 'src/lib/role/domain/interfaces/IRole';

@Injectable()
export class MenuService implements IMenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  update: (id: number, menuData: IMenuUpdate) => Promise<IMenu>;
  getMenuById: (id: number) => Promise<IMenu | null>;

  async get(roleId: IRole['id']): Promise<IMenu[]> {
    console.log('MenuService ~ getMenusByRole ~ roleId:', roleId);

    let role: Role | undefined;

    try {
      role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ['menus'],
      });
    } catch (error) {
      console.error('Error finding role', error);
      throw new RequestTimeoutException('Cannot find role', {
        description: 'Error finding the role for the menu item',
      });
    }

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (!role.menus || role.menus.length === 0) {
      throw new NotFoundException('No menus found for this role');
    }

    console.log('Menus retrieved successfully');
    return role.menus;
  }

  async createItem(menuDto: IMenuAdd): Promise<IMenu> {
    console.log('🚀 ~ MenuService ~ create ~ menuDto:', menuDto);

    let roles: Role[] = [];

    try {
      roles = await this.roleRepository.findBy(menuDto.roles);
    } catch (error) {
      throw new RequestTimeoutException('Cannot find roles', {
        description: 'Error finding roles for the menu item',
      });
    }

    if (roles.length !== menuDto.roles.length) {
      throw new RequestTimeoutException('Some roles were not found', {
        description: 'Some roles provided in the request are not valid',
      });
    }

    let newMenuItem: Menu;

    try {
      newMenuItem = this.menuRepository.create({
        name: menuDto.name,
        icon: menuDto.icon,
        route: menuDto.route,
        roles,
      });
    } catch (error) {
      console.error('Error creating menu item', error);
      throw new RequestTimeoutException('Cannot create menu item', {
        description: 'Error during menu item creation',
      });
    }

    try {
      newMenuItem = await this.menuRepository.save(newMenuItem);
    } catch (error) {
      console.error('Error saving menu item', error);
      throw new RequestTimeoutException('Cannot save menu item', {
        description: 'Error saving the new menu item to the database',
      });
    }

    if (!newMenuItem) {
      throw new UnprocessableEntityException('Menu item could not be created');
    }

    console.log('Created menu item successfully');
    return newMenuItem;
  }
}
