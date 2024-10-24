import { IFooBar } from '../../domain/interfaces/IFooBar';
import { IFooBarService } from '../../domain/service/IFooBar.service';

export class GetFooBarUseCase {
  constructor(private readonly fooBarService: IFooBarService) {}
  async run(id: IFooBar['id']): Promise<IFooBar> {
    return this.fooBarService.get(id);
  }
}
