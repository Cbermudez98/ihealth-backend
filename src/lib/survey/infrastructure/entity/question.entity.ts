import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestion } from '../../domain/interfaces/IQuestion';

@Entity('question')
export class Question implements IQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  type: string;

  @Column()
  required: string;

  @Column()
  maxValue: number;

  @Column()
  surveyId: string;
}
