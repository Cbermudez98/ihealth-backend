import { IFooBar, IFooBarDto, IFooBarUpdateDto } from '../interfaces/IFooBar';

export interface IFooBarService {
  get: (id: IFooBar['id']) => Promise<IFooBar>;
  set: (fooBardDto: IFooBarDto) => Promise<void>;
  update: (id: IFooBar['id'], fooBar: IFooBarUpdateDto) => Promise<void>;
}
