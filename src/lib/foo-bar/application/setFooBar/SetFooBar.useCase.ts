import { IFooBarDto } from '../../domain/interfaces/IFooBar';
import { IFooBarService } from '../../domain/service/IFooBar.service';

export class SetFooBarUseCase {
  constructor(private readonly fooBarService: IFooBarService) {}

  async run(data: IFooBarDto): Promise<void> {
    return this.fooBarService.set(data);
  }
}
