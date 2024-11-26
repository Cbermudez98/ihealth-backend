import { PartialType } from '@nestjs/mapped-types';
import { QuestionDto } from './question.dto';

export class QuestioUpdate extends PartialType(QuestionDto) {}
