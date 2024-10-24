import { IFooBar, IFooBarUpdateDto } from '../../domain/interfaces/IFooBar';
import { IFooBarService } from '../../domain/service/IFooBar.service';

export class UpdateFooBarUseCase {
  constructor(private readonly fooBarService: IFooBarService) {}

  async run(id: IFooBar['id'], updateFooBarDto: IFooBarUpdateDto) {
    return await this.fooBarService.update(id, updateFooBarDto);
  }
}
