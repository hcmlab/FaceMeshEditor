import { BaseMenu } from './BaseMenu';

export class ContextMenu extends BaseMenu<ContextMenu> {
  constructor(item: ContextMenu | undefined | null) {
    super(item);
  }

  toHtml(): HTMLElement {
    return super.toHtml();
  }
}