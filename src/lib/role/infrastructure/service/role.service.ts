import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { IRoleService } from '../../domain/service/IRole.service';
import { IRole } from '../../domain/interfaces/IRole';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async get(id: IRole['id']): Promise<IRole> {
    try {
      return await this.roleRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Role not found');
    }
  }

  async getAll(): Promise<IRole[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new RequestTimeoutException('Error getting roles');
    }
  }
}
