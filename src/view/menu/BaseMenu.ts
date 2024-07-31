import { MenuItem } from './MenuItem';

export abstract class BaseMenu<M extends MenuItem> implements MenuItem {
  protected readonly items: MenuItem[];
  protected readonly item: M | undefined | null;

  constructor(item: M | undefined | null) {
    this.item = item;
  }

  add(item: MenuItem) {
    this.items.push(item);
  }

  remove(item: MenuItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  toHtml(): HTMLElement {
    return undefined;
  }
}