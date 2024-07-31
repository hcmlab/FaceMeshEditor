import { BaseMenu } from './BaseMenu';

export class NavbarMenu extends BaseMenu<NavbarMenu> {
  constructor(item: NavbarMenu | undefined | null) {
    super(item);
  }

  toHtml(): HTMLElement {
    let nav;
    if (this.item) {
      nav = document.createElement("ul");
      nav.className = "navbar-nav"
    } else {
      nav = document.createElement("nav");
      nav.className = "navbar navbar-expand-lg navbar-light";
    }
    const navContainer = document.createElement("div");
    this.items.map(item => item.toHtml()).forEach(html => navContainer.append(html));
    nav.appendChild(navContainer);
    return nav;
  }
}