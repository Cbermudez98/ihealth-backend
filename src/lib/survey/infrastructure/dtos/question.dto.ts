import { IsNotEmpty, IsString } from 'class-validator';
import { IQuestioncreate } from '../../domain/interfaces/IQuestion';

export class QuestionDto implements IQuestioncreate {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  required: string;

  @IsNotEmpty()
  @IsString()
  maxValue: number;

  @IsNotEmpty()
  @IsString()
  surveyId: string;
}
