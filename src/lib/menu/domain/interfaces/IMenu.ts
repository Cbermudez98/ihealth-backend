export interface IMenu {
  id: number;
  name: string;
  icon: any;
  route: string;
}

export interface IMenuDto extends Omit<IMenu, 'id'> {}
