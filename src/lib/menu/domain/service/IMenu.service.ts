import { Injectable } from '@nestjs/common';

@Injectable()
export class ImenuService {
  get: (id: IMenu['id']) => Promise<IMenu>;
}
