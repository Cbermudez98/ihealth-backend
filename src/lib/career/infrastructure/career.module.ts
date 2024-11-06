import { Module } from '@nestjs/common';
import { CareerController } from './controller/career.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entity/career.entity';
import { CareerService } from './service/career.service';
import { GetAllCareerUseCase } from '../application/getAllCareer/GetAllCareer.useCase';
import { ICareerService } from '../domain/service/ICareer.service';
import { GetCareerUseCase } from '../application/getCareer/GetCareer.useCase';
import { CareerSeeder } from 'src/seeds/career.seeder';

@Module({
  controllers: [CareerController],
  imports: [TypeOrmModule.forFeature([Career])],
  providers: [
    {
      provide: 'CareerService',
      useClass: CareerService,
    },
    {
      provide: 'GetAllCareerUseCase',
      useFactory: (service: ICareerService) => new GetAllCareerUseCase(service),
      inject: ['CareerService'],
    },
    {
      provide: 'GetCareerUseCase',
      useFactory: (service: ICareerService) => new GetCareerUseCase(service),
      inject: ['CareerService'],
    },
    CareerSeeder,
  ],
})
export class CareerModule {}
