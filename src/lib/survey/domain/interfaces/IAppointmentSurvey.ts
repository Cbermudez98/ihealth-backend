export interface IAppointmentSurvey {
  id: number;
  competed: boolean;
  surveyId: number;
}

export interface IAppointmentSurveyCreate
  extends Omit<IAppointmentSurvey, 'id'> {}
