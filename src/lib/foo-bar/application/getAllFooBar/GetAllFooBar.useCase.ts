import { IFooBar } from '../../domain/interfaces/IFooBar';
import { IFooBarService } from '../../domain/service/IFooBar.service';

export class GetAllFooBarUseCase {
  constructor(private readonly fooBarService: IFooBarService) {}
  async run(): Promise<IFooBar[]> {
    return await this.fooBarService.getAll();
  }
}
