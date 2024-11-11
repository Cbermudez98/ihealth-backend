import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAuth } from '../../../auth/domain/interfaces/IAuth';

@Entity('auth')
export class Auth implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  access_token: string;
}
