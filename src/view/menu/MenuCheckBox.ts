import { MenuAction } from './MenuAction';
import { generateId } from '../../util/IdGenerator';

/**
 * Represents a checkbox element.
 */
export class MenuCheckBox implements MenuAction {
  private readonly onChangeAction: (checked: boolean) => void;
  private readonly container: HTMLDivElement;
  private readonly input: HTMLInputElement;

  /**
   * Creates a new CheckBox instance.
   * @param {string} id - The ID of the checkbox element.
   * @param {() => void} onChangeAction - A callback function to execute when the checkbox value changes.
   */
  constructor(title: string, onChangeAction: (checked: boolean) => void) {
    const container = document.createElement("div");
    container.className = "form-check form-switch";
    const input = document.createElement("input");
    input.id = generateId();
    input.className = "form-check-input";
    input.type = "checkbox";
    input.role = "switch";
    input.onchange = this.execute;
    container.appendChild(input);
    const label = document.createElement("label");
    label.innerHTML = title;
    label.className = "form-check-label";
    label.htmlFor = input.id;
    label.style.cssText = "text-align: start;";
    container.appendChild(label);

    this.input = input;
    this.container = container;
    this.onChangeAction = onChangeAction;
  }

  execute(): boolean {
    this.onChangeAction(this.isChecked());
    return false;
  }

  toHtml(): HTMLElement {
    return this.container;
  }

  /**
   * Checks whether the checkbox is currently checked.
   * @returns {boolean} - True if checked, false otherwise.
   */
  isChecked(): boolean {
    return this.input.checked;
  }

  /**
   * Sets the checkbox to the specified checked state.
   * @param {boolean} checked - The desired checked state (true or false).
   */
  setChecked(checked: boolean): void {
    this.input.checked = checked;
  }
}
