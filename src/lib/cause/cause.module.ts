import { Module } from '@nestjs/common';
import { CauseController } from './infrastructure/controller/cause.controller';
import { CauseService } from './infrastructure/service/cause.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cause } from './infrastructure/entity/cause.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cause])],
  controllers: [CauseController],
  providers: [CauseService],
})
export class CauseModule {}
