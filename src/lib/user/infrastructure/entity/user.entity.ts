import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne(() => Auth)
  auth: IAuth;

  @ManyToOne(() => Direction)
  direction: IDirection;

  @ManyToMany(() => StudentDetail)
  student_detail: IStudentDetail;
}
