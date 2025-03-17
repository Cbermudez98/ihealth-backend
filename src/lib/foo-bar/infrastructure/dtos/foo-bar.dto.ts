import { IsNotEmpty, IsString } from 'class-validator';
import { IFooBarDto } from '../../domain/interfaces/IFooBar';

export class FooBarDto implements IFooBarDto {
  @IsNotEmpty()
  @IsString()
  foo: string;
}
