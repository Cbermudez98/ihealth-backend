import { IUser } from './IUser';

export interface IDocument {
  id: number;
  name: string;
  users: IUser[];
}

export interface IDocumentBase extends Omit<IDocument, 'users'> {}

export interface IDocumentUser extends Pick<IDocument, 'id'> {}
