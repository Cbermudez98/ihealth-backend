import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../lib/appointment/infrastructure/entity/status.entity';
import { DOCUMENT } from '.././common/constants/keys';
import { Document } from '../lib/user/infrastructure/entity/document.entity';

@Injectable()
export class DocumentSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async onModuleInit() {
    const documents = [
      {
        name: DOCUMENT.CC,
      },
      {
        name: DOCUMENT.CE,
      },
      {
        name: DOCUMENT.PA,
      },
      {
        name: DOCUMENT.TI,
      },
    ];

    const existingStatus = await this.documentRepository.find();

    if (existingStatus.length === 0) {
      await this.documentRepository.save(documents);
    }
  }
}
