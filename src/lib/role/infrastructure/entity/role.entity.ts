import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IRole } from '../../domain/interfaces/IRole';
import { IUser } from '../../../user/domain/interfaces/IUser';
import { User } from '../../../user/infrastructure/entity/user.entity';
import { Menu } from '../../../menu/infrastructure/entity/menu.entity';

@Entity('role')
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: IUser[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus: Menu[];
}
