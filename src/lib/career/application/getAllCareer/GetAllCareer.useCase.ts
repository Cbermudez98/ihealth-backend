import { ICareer } from '../../domain/interfaces/ICareer';
import { ICareerService } from '../../domain/service/ICareer.service';

export class GetAllCareerUseCase {
  constructor(private readonly fooBarService: ICareerService) {}
  async run(): Promise<ICareer[]> {
    return await this.fooBarService.getAll();
  }
}
