import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../lib/role/infrastructure/entity/role.entity';
import { IRoleCreate } from '../lib/role/domain/interfaces/IRole';
import { ROLES } from './../common/constants/roles.enum';

@Injectable()
export class RoleSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const roles: IRoleCreate[] = [
      {
        name: ROLES.USER,
      },
      {
        name: ROLES.ADMIN,
      },
      {
        name: ROLES.COORDINATOR,
      },
    ];

    const existingCareers = await this.roleRepository.find();

    if (existingCareers.length === 0) {
      await this.roleRepository.save(roles);
    }
  }
}
