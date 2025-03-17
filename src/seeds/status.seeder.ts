import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleCreate } from '../lib/role/domain/interfaces/IRole';
import { ROLES } from './../common/constants/roles.enum';
import { Status } from '../lib/appointment/infrastructure/entity/status.entity';
import {
  IStatusCreate,
  STATUS,
} from '../lib/appointment/domain/interfaces/IStatus';

@Injectable()
export class StatusSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async onModuleInit() {
    const statues: IStatusCreate[] = [
      {
        name: STATUS.PENDING,
      },
      {
        name: STATUS.CLOSE,
      },
      {
        name: STATUS.ATTENDED,
      },
    ];

    const existingStatus = await this.statusRepository.find();

    if (existingStatus.length === 0) {
      await this.statusRepository.save(statues);
    }
  }
}
