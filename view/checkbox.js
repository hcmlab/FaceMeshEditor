/**
 * Represents a checkbox element.
 */
export class CheckBox {
    /**
     * Creates a new CheckBox instance.
     * @param {string} id - The ID of the checkbox element.
     * @param {() => void} onChangeCallback - A callback function to execute when the checkbox value changes.
     */
    constructor(id, onChangeCallback) {
        this.elem = document.getElementById(id);
        this.elem.onchange = onChangeCallback;
    }
    /**
     * Checks whether the checkbox is currently checked.
     * @returns {boolean} - True if checked, false otherwise.
     */
    isChecked() {
        return this.elem.checked;
    }
    /**
     * Sets the checkbox to the specified checked state.
     * @param {boolean} checked - The desired checked state (true or false).
     */
    setChecked(checked) {
        this.elem.checked = checked;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBR2pCOzs7O09BSUc7SUFDSCxZQUFZLEVBQVUsRUFBRSxnQkFBNEI7UUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBcUIsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVUsQ0FBQyxPQUFnQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDaEMsQ0FBQztDQUNKIn0=