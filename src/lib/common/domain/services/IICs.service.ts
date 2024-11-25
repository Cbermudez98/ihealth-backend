export interface IICs {
  startDate: string;
  endDate: string;
  summary: string;
  description: string;
  location: string;
  url: string;
  mailTo: string;
}

export interface IICsService {
  generate: (ics: IICs) => string;
}
