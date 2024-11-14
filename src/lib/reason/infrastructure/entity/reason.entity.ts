import { ICause } from './../../../cause/domain/interfaces/ICause';
import { IReason } from '../../domain/interfaces/IReason';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Cause } from '../../../cause/infrastructure/entity/cause.entity';

@Entity()
export class Reason implements IReason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cause, (cause) => cause.reason)
  causes: ICause[];
}
