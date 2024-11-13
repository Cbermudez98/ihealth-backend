import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ICareer } from '../../domain/interfaces/ICareer';
import { StudentDetail } from '../../../user/infrastructure/entity/student-details.entity';
import { IStudentDetail } from '../../../user/domain/interfaces/IStudentDetail';

@Entity('career')
export class Career implements ICareer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
}
