import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ICause } from '../../domain/interfaces/ICause';
import { IReason } from '../../../reason/domain/interfaces/IReason';
import { Reason } from '../../../reason/infrastructure/entity/reason.entity';

@Entity()
export class Cause implements ICause {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Reason, (reason) => reason.causes)
  reason: IReason;
}
