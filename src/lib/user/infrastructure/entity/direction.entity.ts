import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IDirection } from '../../domain/interfaces/IDirection';

@Entity('direction')
export class Direction implements IDirection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  aditional_information: string;
}
