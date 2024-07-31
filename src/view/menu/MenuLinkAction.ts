import { MenuAction } from "./MenuAction";

export class MenuLinkAction implements MenuAction {
  private readonly title: string;
  private readonly shortcutKeys: string[];
  private readonly icon: string;
  private readonly action: () => void;

  constructor(title: string, shortcut: string = '', icon: string = '', action: () => void) {
    this.title = title;
    this.shortcutKeys = shortcut
      .split('+')
      .map((k: string) =>
        k
          .replace('Control', 'CTRL')
          .replace('Shift', 'SHIFT')
          .replace('Wheel', 'SCROLL')
      );
    this.icon = icon;
    this.action = action;
  }

  execute(): boolean {
    this.action();
    return false;
  }

  toHtml(): HTMLElement {
    const a = document.createElement("a");
    a.className = "nav-link btn btn-light";
    a.href = "#";
    a.onclick = this.execute
    a.innerHTML = this.title;
    if (this.shortcutKeys.length > 0) {
      const table: HTMLTableElement = document.createElement('table');
      table.style.cssText = 'width: 100%';
      const row: HTMLTableRowElement = document.createElement('tr');
      table.appendChild(row);
      const menuTextCol: HTMLTableCellElement = document.createElement('td');
      menuTextCol.innerHTML = a.innerHTML;
      row.appendChild(menuTextCol);
      const menuShortCutCol: HTMLTableCellElement =
        document.createElement('td');
      menuShortCutCol.style.cssText = 'text-align: end;';
      menuShortCutCol.innerHTML = this.shortcutKeys
        .map((k: string) => '<kbd>' + k + '</kbd>')
        .join('+');
      row.appendChild(menuShortCutCol);
      a.replaceChildren(table);
      a.style.cssText = 'width: 100%; text-align: start; padding: .2vw;';
    }
    if (this.icon) {
      const i = document.createElement("i");
      i.className = this.icon
      a.appendChild(i);
    }
    return a;
  }
}