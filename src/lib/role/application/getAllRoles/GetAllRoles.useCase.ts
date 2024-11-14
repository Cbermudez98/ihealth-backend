import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';
import { IRoleService } from '../../domain/service/IRole.service';

export class GetAllRolesUseCase {
  constructor(private readonly roleService: IRoleService) {}

  async run() {
    const roles = await this.roleService.getAll();
    if (!roles) {
      throw new NotFoundError('Roles not found');
    }
    return roles;
  }
}
