export enum TEMPLATE_MAIL {
  WELCOME,
  SCHEDULED_APPOINTMENT,
}

export interface IMail {
  to: string;
  subject: string;
  template: TEMPLATE_MAIL;
  context?: Record<string, any>;
  attachments?: IAttachment[];
  callEvent?: IAttachment;
}

interface IAttachment {
  fileName: string;
  content: any;
  encoding: 'utf-8';
}

export interface IMailerService {
  sendEmail: (mail: IMail) => Promise<boolean>;
}
