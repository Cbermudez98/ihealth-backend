import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ICauseService } from '../../domain/service/ICause.service';
import { IReason } from '../../../../lib/reason/domain/interfaces/IReason';
import {
  ICauseCreate,
  ICause,
  ICauseUpdate,
} from '../../domain/interfaces/ICause';
import { InjectRepository } from '@nestjs/typeorm';
import { Cause } from '../entity/cause.entity';
import { Repository } from 'typeorm';
import { Reason } from './../../../reason/infrastructure/entity/reason.entity';
import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';

@Injectable()
export class CauseService implements ICauseService {
  constructor(
    @InjectRepository(Cause)
    private readonly causeRepository: Repository<Cause>,
    @InjectRepository(Reason)
    private readonly reasonRepository: Repository<Reason>,
  ) {}

  async create(id: IReason['id'], cause: ICauseCreate): Promise<ICause> {
    let reason: IReason | undefined;
    let newCause: ICause | undefined;
    try {
      reason = await this.reasonRepository.findOne({
        where: {
          id,
        },
        relations: {
          causes: true,
        },
      });
    } catch (error) {
      throw new NotFoundError('Reason not found');
    }

    try {
      newCause = this.causeRepository.create(cause);
      newCause.reason = reason;
    } catch (error) {
      throw new RequestTimeoutException('Could not create cause');
    }

    try {
      await this.causeRepository.save(newCause);
    } catch (error) {
      throw new RequestTimeoutException('Could not save cause');
    }
    return newCause;
  }

  async update(id: ICause['id'], cause: ICauseUpdate): Promise<boolean> {
    let causeToUpdate: ICause | undefined;
    try {
      causeToUpdate = await this.causeRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundError('Cause not found');
    }

    causeToUpdate.name = cause.name ?? causeToUpdate.name;
    try {
      await this.causeRepository.save(causeToUpdate);
    } catch (error) {
      throw new RequestTimeoutException('Could not update cause');
    }
    return true;
  }

  async get(id: IReason['id']): Promise<ICause[]> {
    return await this.causeRepository.find({
      where: {
        reason: {
          id: id,
        },
      },
    });
  }

  async getSingle(id: ICause['id']): Promise<ICause> {
    try {
      return await this.causeRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      throw new NotFoundError('Cause not found');
    }
  }
}
