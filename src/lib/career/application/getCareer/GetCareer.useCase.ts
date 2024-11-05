import { ICareer } from '../../domain/interfaces/ICareer';
import { ICareerService } from '../../domain/service/ICareer.service';

export class GetCareerUseCase {
  constructor(private readonly fooBarService: ICareerService) {}
  async run(id: ICareer['id']): Promise<ICareer> {
    return this.fooBarService.get(id);
  }
}
