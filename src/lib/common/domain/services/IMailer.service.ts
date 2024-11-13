export enum TEMPLATE_MAIL {
  WELCOME,
}

export interface IMail {
  to: string;
  subject: string;
  template: TEMPLATE_MAIL;
}

export interface IMailerService {
  sendEmail: (mail: IMail) => Promise<boolean>;
}
