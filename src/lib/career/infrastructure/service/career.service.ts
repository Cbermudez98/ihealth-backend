import { GatewayTimeoutException, Injectable } from '@nestjs/common';
import { ICareerService } from '../../domain/service/ICareer.service';
import { ICareer } from '../../domain/interfaces/ICareer';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from '../entity/career.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';

@Injectable()
export class CareerService implements ICareerService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  async get(id: ICareer['id']): Promise<ICareer> {
    const career = await this.careerRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundError('Carrer not found');
    }
    return career;
  }

  async getAll(): Promise<ICareer[]> {
    let career: Career[] | undefined;
    try {
      career = await this.careerRepository.find();
    } catch (error) {
      throw new GatewayTimeoutException();
    }
    return career;
  }
}
