/**
 * Represents a slider input element.
 */
export class Slider {
    private readonly slider: HTMLInputElement;
    private readonly onChangeCallback: () => void;

    /**
     * Creates a new Slider instance.
     * @param {string} id - The ID of the slider element.
     * @param {() => void} onChangeCallback - A callback function to execute when the slider value changes.
     */
    constructor(id: string, onChangeCallback: () => void) {
        this.slider = document.getElementById(id) as HTMLInputElement;
        this.slider.oninput = onChangeCallback;
        this.onChangeCallback = onChangeCallback;
    }

    /**
     * Gets the minimum value of the slider.
     * @returns {number} - The minimum value.
     */
    getMin(): number {
        return parseInt(this.slider.min);
    }

    /**
     * Gets the maximum value of the slider.
     * @returns {number} - The maximum value.
     */
    getMax(): number {
        return parseInt(this.slider.max);
    }

    /**
     * Gets the current value of the slider.
     * @returns {number} - The current value.
     */
    getValue(): number {
        return parseInt(this.slider.value);
    }

    /**
     * Sets the value of the slider.
     * @param {number} value - The desired value.
     */
    setValue(value: number): void {
        this.slider.value = String(value);
        this.onChangeCallback();
    }
}
