import { MenuItem } from './MenuItem';

export interface MenuAction extends MenuItem {
  execute(): boolean;
}