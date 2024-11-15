import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IMenu } from '../../domain/interfaces/IMenu';

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
}
