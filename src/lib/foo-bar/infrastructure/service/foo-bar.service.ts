import {
  GatewayTimeoutException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFooBarService } from '../../domain/service/IFooBar.service';
import {
  IFooBar,
  IFooBarDto,
  IFooBarUpdateDto,
} from '../../domain/interfaces/IFooBar';
import { Foo } from '../entity/foo.entity';
import { NotFoundError } from './../../../common/domain/errors/NotFoundErrors';

@Injectable()
export class FooBarService implements IFooBarService {
  constructor(
    @InjectRepository(Foo) private readonly fooRepository: Repository<Foo>,
  ) {}
  async get(id: IFooBar['id']): Promise<IFooBar> {
    const fooBar = await this.fooRepository.findOneBy({ id });
    if (!fooBar) {
      throw new NotFoundError('Foo bar not found');
    }
    return fooBar;
  }

  async getAll(): Promise<IFooBar[]> {
    let fooBars: Foo[] | undefined;
    try {
      fooBars = await this.fooRepository.find();
    } catch (error) {
      throw new GatewayTimeoutException();
    }
    return fooBars;
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
  }
}
