import { Module } from '@nestjs/common';
import { BullService } from './bull.service';

@Module({
  providers: [BullService],
})
export class BullModule {}
