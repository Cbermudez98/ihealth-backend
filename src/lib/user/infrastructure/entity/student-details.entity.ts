import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IStudentDetail } from '../../domain/interfaces/IStudentDetail';
import { ICareer } from '../../../career/domain/interfaces/ICareer';
import { Career } from '../../../career/infrastructure/entity/career.entity';

@Entity('student_details')
export class StudentDetail implements IStudentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Career)
  career_id: ICareer;

  @Column({ type: 'int' })
  semester: number;
}
