import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IMenu } from '../../domain/interfaces/IMenu';
import { Role } from '../../../role/infrastructure/entity/role.entity';

@Entity('menu')
export class Menu implements IMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ type: 'varchar' })
  route: string;

  @ManyToMany(() => Role, (role) => role.menus)
  @JoinTable()
  roles: Role[];
}
