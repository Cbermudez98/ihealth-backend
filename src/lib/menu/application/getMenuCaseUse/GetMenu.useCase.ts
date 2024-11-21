import { NotFoundError } from '../../../common/domain/errors/NotFoundErrors';
import { IRole } from '../../../role/domain/interfaces/IRole';
import { IRoleService } from '../../../role/domain/service/IRole.service';
import { IMenu } from '../../domain/interfaces/IMenu';

export class GetMenuUseCase {
  constructor(private readonly roleService: IRoleService) {}

  async run(id: IRole['id']): Promise<IMenu[]> {
    const role = await this.roleService.get(id);
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    const menus = role.menus;
    return menus;
  }
}
