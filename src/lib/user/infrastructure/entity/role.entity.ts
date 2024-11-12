import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRole } from '../../domain/interfaces/IRole';
import { IUser } from '../../domain/interfaces/IUser';
import { User } from './user.entity';

@Entity('role')
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: IUser[];
}
