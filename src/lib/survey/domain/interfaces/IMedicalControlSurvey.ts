export interface IMedicalControlSurvey {
  id: number;
  completed: boolean;
  surveyId: number;
  medicalControlId: number;
}

export interface IMedicalControlSurveyCreate
  extends Omit<IMedicalControlSurvey, 'id'> {}
