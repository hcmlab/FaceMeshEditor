
export class CheckBox {
    private elem: HTMLInputElement;

    constructor(id: string, onChangeCallback: () => void) {
        this.elem = document.getElementById(id) as HTMLInputElement;
        this.elem.onchange = onChangeCallback;
    }

    isChecked() : boolean {
        return this.elem.checked;
    }

    setChecked(checked: boolean) : void {
        this.elem.checked = checked;
    }
}