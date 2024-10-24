import {
  GatewayTimeoutException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IFooBarService } from '../../domain/service/IFooBar.service';
import {
  IFooBar,
  IFooBarDto,
  IFooBarUpdateDto,
} from '../../domain/interfaces/IFooBar';
import { InjectRepository } from '@nestjs/typeorm';
import { Foo } from '../entity/foo.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'src/lib/common/domain/errors/NotFoundErrors';

@Injectable()
export class FooBarService implements IFooBarService {
  constructor(
    @InjectRepository(Foo) private readonly fooRepository: Repository<Foo>,
  ) {}
  async get(id: IFooBar['id']): Promise<IFooBar> {
    const fooBar = await this.fooRepository.findOneBy({ id });
    if (!fooBar) {
      throw new NotFoundError(HttpStatus.NOT_FOUND, 'Foo bar not found');
    }
    return fooBar;
  }

  async set(fooBardDto: IFooBarDto): Promise<void> {
    try {
      const foo = this.fooRepository.create(fooBardDto);
      await this.fooRepository.save(foo);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async update(id: IFooBar['id'], fooBar: IFooBarUpdateDto): Promise<void> {
    let foo: Foo | undefined;
    try {
      foo = await this.fooRepository.findOneBy({ id });
    } catch (error) {
      throw new GatewayTimeoutException();
    }

    if (!foo) {
      throw new NotFoundException();
    }

    foo.foo = fooBar?.foo ? fooBar.foo : foo.foo;

    try {
      await this.fooRepository.save(foo);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
    return;
  }
}
