import { Injectable } from '@nestjs/common';
import { IMenu, IMenuAdd, IMenuUpdate } from '../interfaces/IMenu';

@Injectable()
export class IMenuService {
  getMenus: (role: string) => Promise<IMenu[]>; //Hecho
  createItem: (menu: IMenuAdd) => Promise<IMenu>; //Hecho
  updateItems: (id: number, menuData: IMenuUpdate) => Promise<IMenu>; //Hecho
  getMenuById: (id: IMenu['id']) => Promise<IMenu | null>; //Hecho
  deleteMenu: (id: IMenu['id']) => Promise<void>;
}
