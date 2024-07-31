import { MenuItem } from './MenuItem';

export class MenuSeparator implements MenuItem {
  private readonly hr: HTMLHRElement;

  constructor(dropdown: boolean) {
    this.hr = document.createElement('hr');
    if (dropdown) {
     this.hr.className = "dropdown-divider";
    }
  }

  toHtml(): HTMLElement {
    return this.hr;
  }
}