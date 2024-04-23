/**
 * Represents a slider input element.
 */
export declare class Slider {
    private readonly slider;
    private readonly onChangeCallback;
    /**
     * Creates a new Slider instance.
     * @param {string} id - The ID of the slider element.
     * @param {() => void} onChangeCallback - A callback function to execute when the slider value changes.
     */
    constructor(id: string, onChangeCallback: () => void);
    /**
     * Gets the minimum value of the slider.
     * @returns {number} - The minimum value.
     */
    getMin(): number;
    /**
     * Gets the maximum value of the slider.
     * @returns {number} - The maximum value.
     */
    getMax(): number;
    /**
     * Gets the current value of the slider.
     * @returns {number} - The current value.
     */
    getValue(): number;
    /**
     * Sets the value of the slider.
     * @param {number} value - The desired value.
     */
    setValue(value: number): void;
}
