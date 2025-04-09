import { IUser } from './IUser';

export interface IPsychologist {
  id: number;
  professional_license: string;
  specialty: string;
  user: IUser;
}
