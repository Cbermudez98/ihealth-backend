import { Module } from '@nestjs/common';
import { BullService } from './bull.service';

@Module({
  exports: [BullModule, BullService],
  providers: [BullService],
})
export class BullModule {}
