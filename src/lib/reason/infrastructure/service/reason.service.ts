import {
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IReasonService } from '../../domain/service/IReason.service';
import {
  IReasonCreate,
  IReason,
  IReasonUpdate,
} from '../../domain/interfaces/IReason';
import { InjectRepository } from '@nestjs/typeorm';
import { Reason } from '../../infrastructure/entity/reason.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReasonService implements IReasonService {
  constructor(
    @InjectRepository(Reason)
    private readonly reasonRepository: Repository<Reason>,
  ) {}

  async create(reason: IReasonCreate): Promise<IReason> {
    let newReason: IReason | undefined;
    try {
      newReason = this.reasonRepository.create(reason);
    } catch (error) {
      throw new RequestTimeoutException('Error creating user');
    }

    try {
      newReason = await this.reasonRepository.save(newReason);
    } catch (error) {
      throw new UnprocessableEntityException('Error saving user');
    }

    return newReason;
  }

  async get(id: IReason['id']): Promise<IReason> {
    return await this.reasonRepository.findOne({
      where: { id },
      relations: {
        causes: true,
      },
    });
  }

  async getAll(): Promise<IReason[]> {
    return await this.reasonRepository.find();
  }

  async update(id: IReason['id'], reason: IReasonUpdate): Promise<boolean> {
    let reasonToUpdate = await this.get(id);
    reasonToUpdate.name = reason?.name ?? reasonToUpdate.name;

    try {
      await this.reasonRepository.save(reasonToUpdate);
    } catch (error) {
      throw new RequestTimeoutException('Error updating reason');
    }
    return true;
  }
}
