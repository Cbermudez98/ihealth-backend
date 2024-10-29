import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IStudentDetail } from '../../domain/interfaces/IStudentDetail';
import { ICareer } from '../../domain/interfaces/ICareer';
import { Career } from './career.entity';

@Entity('student_details')
export class StudentDetail implements IStudentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Career)
  career_id: ICareer;

  @Column({ type: 'int' })
  semester: number;
}
