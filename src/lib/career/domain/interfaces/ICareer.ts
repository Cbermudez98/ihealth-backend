export interface ICareer {
  id: number;
  name: string;
}

export interface ICareerCreate extends Omit<ICareer, 'id'> {}
export interface ICareerDto extends Omit<ICareer, 'id'> {}
export interface ICareerUpdateDto extends Partial<ICareerDto> {}
