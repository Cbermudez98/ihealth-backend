import { Module } from '@nestjs/common';
import { CareerController } from './controller/career.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entity/career.entity';
import { CareerService } from './service/career.service';
import { GetAllCareerUseCase } from '../application/getAllCareer/GetAllCareer.useCase';
import { ICareerService } from '../domain/service/ICareer.service';
import { GetCareerUseCase } from '../application/getCareer/GetCareer.useCase';
import { CareerSeeder } from '../../../seeds/career.seeder';
import { CONSTANTS } from '../../../common/constants/constants';

@Module({
  controllers: [CareerController],
  imports: [TypeOrmModule.forFeature([Career])],
  providers: [
    {
      provide: CONSTANTS.PROVIDERS.CAREER_SERVICE,
      useClass: CareerService,
    },
    {
      provide: CONSTANTS.USE_CASES.GET_ALL_CAREER_USE_CASE,
      useFactory: (service: ICareerService) => new GetAllCareerUseCase(service),
      inject: [CONSTANTS.PROVIDERS.CAREER_SERVICE],
    },
    {
      provide: CONSTANTS.USE_CASES.GET_CAREER_USE_CASE,
      useFactory: (service: ICareerService) => new GetCareerUseCase(service),
      inject: [CONSTANTS.PROVIDERS.CAREER_SERVICE],
    },
    CareerSeeder,
  ],
  exports: [CONSTANTS.PROVIDERS.CAREER_SERVICE],
})
export class CareerModule {}
