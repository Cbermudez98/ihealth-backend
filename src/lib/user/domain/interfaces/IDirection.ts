export interface IDirection {
  id: number;
  neighborhood: string;
  street: string;
  number: string;
  aditional_information: string;
}

export interface IDirectionCreate extends Omit<IDirection, 'id'> {}
