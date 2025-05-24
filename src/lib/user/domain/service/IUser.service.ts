import { IDocumentBase } from '../interfaces/IDocument';
import { IPsychologistCreate } from '../interfaces/IPsychologist';
import { IUser, IUserCreate, IUserUpdate } from '../interfaces/IUser';

export interface IUserService {
  create: (user: IUserCreate) => Promise<IUser>;
  createPsychologist: (user: IPsychologistCreate) => Promise<IUser>;
  get: (id: IUser['id']) => Promise<IUser>;
  update: (id: IUser['id'], userToUpdate: IUserUpdate) => Promise<boolean>;
  getPsychologist: () => Promise<IUser[]>;
  getAll: () => Promise<IUser[]>;
  getDocuments: () => Promise<IDocumentBase[]>;
}
