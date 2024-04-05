export class Slider {
    private readonly slider: HTMLInputElement;
    private readonly onChangeCallback: () => void;

    /**
     * Creates a new slider.
     *
     * @param id of the html element.
     * @param onChangeCallback called when the slider value changes.
     */
    constructor(id: string, onChangeCallback: () => void) {
        this.slider = document.getElementById(id) as HTMLInputElement;
        this.slider.oninput = onChangeCallback;
        this.onChangeCallback = onChangeCallback;
    }

    /**
     * Get the minimum slider value possible.
     */
    getMin() : number {
        return parseInt(this.slider.min);
    }

    /**
     * Get the maximum slider value possible.
     */
    getMax() : number {
        return parseInt(this.slider.max);
    }

    /**
     * Get the slider value.
     */
    getValue() : number {
        return parseInt(this.slider.value);
    }

    /**
     * Set the slider value.
     *
     * @param value to set.
     */
    setValue(value: number) : void {
        this.slider.value = String(value);
        this.onChangeCallback();
    }
}