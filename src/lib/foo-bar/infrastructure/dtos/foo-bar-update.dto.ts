import { PartialType } from '@nestjs/mapped-types';
import { FooBarDto } from './foo-bar.dto';

export class UpdateFooBarDto extends PartialType(FooBarDto) {}
