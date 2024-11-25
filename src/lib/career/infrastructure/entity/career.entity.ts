import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICareer } from '../../domain/interfaces/ICareer';

@Entity('career')
export class Career implements ICareer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
}
