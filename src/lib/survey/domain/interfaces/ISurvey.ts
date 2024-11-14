export interface ISurvey {
  id: number;
  title: string;
  description: string;
  date: string;
  available: boolean;
}

export interface ISurveyCreate extends Omit<ISurvey, 'id'> {}
export interface ISurveyUpdate extends Omit<ISurvey, 'id'> {}
