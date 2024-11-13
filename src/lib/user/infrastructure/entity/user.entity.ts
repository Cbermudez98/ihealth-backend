import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../../domain/interfaces/IUser';
import { IAuth } from '../../../auth/domain/interfaces/IAuth';
import { IDirection } from '../../domain/interfaces/IDirection';
import { IStudentDetail } from '../../domain/interfaces/IStudentDetail';
import { Direction } from './direction.entity';
import { StudentDetail } from './student-details.entity';
import { Auth } from '../../../auth/infrastructure/entity/auth.entity';
import { IRole } from '../../../role/domain/interfaces/IRole';
import { Role } from '../../../role/infrastructure/entity/role.entity';

@Entity('person')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column({ type: 'bigint', unique: true })
  code: number;

  @Column({ length: 1 })
  gender: string;

  @OneToOne(() => Auth, { cascade: true })
  @JoinColumn()
  auth: IAuth;

  @OneToOne(() => Direction, { cascade: true })
  @JoinColumn()
  direction: IDirection;

  @OneToOne(() => StudentDetail, { cascade: true })
  @JoinColumn()
  student_detail: IStudentDetail;

  @ManyToOne(() => Role, (role) => role.users)
  role: IRole;
}
