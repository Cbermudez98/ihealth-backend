import { Module } from '@nestjs/common';
import { FooBarController } from './controller/foo-bar.controller';
import { FooBarService } from './service/foo-bar.service';
import { IFooBarService } from '../domain/service/IFooBar.service';
import { GetFooBarUseCase } from '../application/getFooBar/GetFooBar.useCase';
import { SetFooBarUseCase } from '../application/setFooBar/SetFooBar.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foo } from './entity/foo.entity';
import { UpdateFooBarUseCase } from '../application/updateFooBat/UpdateFooBar.useCase';
import { GetAllFooBarUseCase } from '../application/getAllFooBar/GetAllFooBar.useCase';

@Module({
  controllers: [FooBarController],
  imports: [TypeOrmModule.forFeature([Foo])],
  providers: [
    {
      provide: 'FooBarService',
      useClass: FooBarService,
    },
    {
      provide: 'GetFooBarUseCase',
      useFactory: (service: IFooBarService) => new GetFooBarUseCase(service),
      inject: ['FooBarService'],
    },
    {
      provide: 'GetAllFooBarUseCase',
      useFactory: (service: IFooBarService) => new GetAllFooBarUseCase(service),
      inject: ['FooBarService'],
    },
    {
      provide: 'SetFooBarUseCase',
      useFactory: (service: IFooBarService) => new SetFooBarUseCase(service),
      inject: ['FooBarService'],
    },
    {
      provide: 'UpdateFooBarUseCase',
      useFactory: (service: IFooBarService) => new UpdateFooBarUseCase(service),
      inject: ['FooBarService'],
    },
  ],
})
export class FooBarModule {}
