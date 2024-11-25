import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cause } from '../lib/cause/infrastructure/entity/cause.entity';
import { Reason } from '../lib/reason/infrastructure/entity/reason.entity';
import { reasonsAndCauseSeeder } from './mockReasonAndCauses';

@Injectable()
export class ReasonAndCauseSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Reason)
    private readonly reasonRepository: Repository<Reason>,
    @InjectRepository(Cause)
    private readonly causeRepository: Repository<Cause>,
  ) {}
  async onModuleInit() {
    const existingReason = await this.reasonRepository.find({
      relations: {
        causes: true,
      },
    });

    if (existingReason.length === 0) {
      const reason = this.parseData();

      await this.reasonRepository.save(reason);
    }
  }

  private parseData(): Reason[] {
    return reasonsAndCauseSeeder.map((reason) => {
      return this.reasonRepository.create({
        ...reason,
        causes: reason.causes.map((cause) =>
          this.causeRepository.create(cause),
        ),
      });
    });
  }
}
