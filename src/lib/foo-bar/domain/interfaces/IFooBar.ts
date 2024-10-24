export interface IFooBar {
  id: number;
  foo: string;
}

export interface IFooBarDto extends Omit<IFooBar, 'id'> {}

export interface IFooBarUpdateDto extends Partial<IFooBarDto> {}
