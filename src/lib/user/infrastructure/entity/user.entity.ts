import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../domain/interfaces/IUser';
import { IAuth } from '../../../auth/domain/interfaces/IAuth';
import { IDirection } from '../../domain/interfaces/IDirection';
import { IStudentDetail } from '../../domain/interfaces/IStudentDetail';
import { Direction } from './direction.entity';
import { StudentDetail } from './student-details.entity';
import { Auth } from '../../../auth/infrastructure/entity/auth.entity';

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

  @Column()
  code: number;

  @Column({ length: 1 })
  gender: string;

  @OneToOne(() => Auth)
  auth: IAuth;

  @OneToOne(() => Direction)
  direction: IDirection;

  @OneToOne(() => StudentDetail)
  student_detail: IStudentDetail;
}
