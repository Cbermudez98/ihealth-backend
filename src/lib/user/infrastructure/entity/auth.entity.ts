import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAuth } from '../../domain/interfaces/IAuth';

@Entity('auth')
export class Auth implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
