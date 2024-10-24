import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IFooBar } from '../../domain/interfaces/IFooBar';

@Entity()
export class Foo implements IFooBar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  foo: string;
}
