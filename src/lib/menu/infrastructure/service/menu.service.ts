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

@Injectable()
export class MenuService implements IMenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async updateItems(menuId: number, menuDto: Partial<IMenu>): Promise<Menu> {
    const menu = await this.getMenuById(menuId);
    if (!menu) {
      throw new NotFoundException(`Menu not found`);
    }

    const updatedMenu = Object.assign(menu, menuDto);

    try {
      return await this.menuRepository.save(updatedMenu);
    } catch (error) {
      console.error('Error saving updated menu: ', error);
      throw new Error('Could not save the updated menu');
    }
  }

  async getMenuById(id: IMenu['id']): Promise<IMenu | null> {
    let menu: Menu | null = null;

    try {
      menu = await this.menuRepository.findOne({
        where: { id },
        relations: { roles: true },
      });
    } catch (error) {
      console.error('Error querying menu by ID:', error);
      throw new RequestTimeoutException('Error retrieving menu by ID');
    }

    return menu;
  }

  async getMenus(role: string): Promise<Menu[]> {
    return this.menuRepository.find({
      where: { roles: { name: role } },
      relations: ['roles'],
    });
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
