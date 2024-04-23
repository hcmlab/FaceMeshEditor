/**
 * Represents a checkbox element.
 */
export declare class CheckBox {
    private elem;
    /**
     * Creates a new CheckBox instance.
     * @param {string} id - The ID of the checkbox element.
     * @param {() => void} onChangeCallback - A callback function to execute when the checkbox value changes.
     */
    constructor(id: string, onChangeCallback: () => void);
    /**
     * Checks whether the checkbox is currently checked.
     * @returns {boolean} - True if checked, false otherwise.
     */
    isChecked(): boolean;
    /**
     * Sets the checkbox to the specified checked state.
     * @param {boolean} checked - The desired checked state (true or false).
     */
    setChecked(checked: boolean): void;
}
