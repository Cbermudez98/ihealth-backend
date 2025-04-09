import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { IPsychologist } from '../../domain/interfaces/IPsychologist';

@Entity('psychologist')
export class Psychologist implements IPsychologist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  professional_license: string;

  @Column({ type: 'text', nullable: true })
  specialty: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}
