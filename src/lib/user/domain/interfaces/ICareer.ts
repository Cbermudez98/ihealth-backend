export interface ICareer {
  id: number;
  name: string;
}

export interface ICareerCreate extends Omit<ICareer, 'id'> {}
