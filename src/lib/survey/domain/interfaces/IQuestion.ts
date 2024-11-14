export interface IQuestion {
  id: number;
  question: string;
  type: string;
  required: string;
  maxValue: number;
  surveyId: string;
}

export interface IQuestioncreate extends Omit<IQuestion, 'id'> {}
