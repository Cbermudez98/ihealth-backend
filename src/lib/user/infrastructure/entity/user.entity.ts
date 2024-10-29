import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../../domain/interfaces/IUser';
import { IAuth } from '../../domain/interfaces/IAuth';
import { IDirection } from '../../domain/interfaces/IDirection';
import { IStudentDetail } from '../../domain/interfaces/IStudentDetail';
import { Auth } from './auth.entity';
import { Direction } from './direction.entity';
import { StudentDetail } from './student-details.entity';

@Entity('person')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column('timestamp')
  age: number;

  @Column()
  code: string;

  @Column({ length: 1 })
  gender: string;

  @OneToOne(() => Auth)
  auth: IAuth;

  @OneToOne(() => Direction)
  direction: IDirection;

  @OneToOne(() => StudentDetail)
  student_detail: IStudentDetail;
}
