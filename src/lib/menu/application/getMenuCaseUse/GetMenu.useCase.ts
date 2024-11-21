import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { IRoleService } from '../../../role/domain/service/IRole.service';
import { IMenu } from '../../domain/interfaces/IMenu';
import { IMenuService } from '../../domain/service/IMenu.service';
import { IRole } from 'src/lib/role/domain/interfaces/IRole';

@Injectable()
export class GetMenuUseCase {
  constructor(
    private readonly roleService: IRoleService,
    private readonly menuService: IMenuService,
  ) {}

  async run(roleId: IRole['id']): Promise<IMenu[]> {
    let menus: IMenu[];

    try {
      if (!this.menuService) {
        throw new Error('MenuService is not defined');
      }

      menus = await this.menuService.get(roleId);
    } catch (error) {
      console.error('Error retrieving menus: ', error);
      throw new RequestTimeoutException('Error retrieving menus', {
        description: 'Something went wrong when retrieving menus for the role',
      });
    }

    return menus;
  }
}
