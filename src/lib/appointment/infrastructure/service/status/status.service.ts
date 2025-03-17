import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStatus } from './../../../../appointment/domain/interfaces/IStatus';
import { IStatusService } from './../../../../appointment/domain/services/IStatus.service';
import { Status } from '../../entity/status.entity';
import { NotFoundError } from './../../../../common/domain/errors/NotFoundErrors';

@Injectable()
export class StatusService implements IStatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}
  async get(id: IStatus['id']): Promise<IStatus> {
    try {
      return await this.statusRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundError('Role not found');
    }
  }
}
