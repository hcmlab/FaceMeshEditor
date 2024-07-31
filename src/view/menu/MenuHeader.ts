import { MenuItem } from './MenuItem';

export class MenuHeader implements MenuItem {
  private readonly title: string;
  private readonly size: number;

  constructor(title: string, size: number = 5) {
    this.title = title;
    this.size = size;
  }

  toHtml(): HTMLElement {
    const header = document.createElement("h"+this.size);
    header.innerHTML = this.title;
    return header;
  }
}