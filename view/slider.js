/**
 * Represents a slider input element.
 */
export class Slider {
    /**
     * Creates a new Slider instance.
     * @param {string} id - The ID of the slider element.
     * @param {() => void} onChangeCallback - A callback function to execute when the slider value changes.
     */
    constructor(id, onChangeCallback) {
        this.slider = document.getElementById(id);
        this.slider.oninput = onChangeCallback;
        this.onChangeCallback = onChangeCallback;
    }
    /**
     * Gets the minimum value of the slider.
     * @returns {number} - The minimum value.
     */
    getMin() {
        return parseInt(this.slider.min);
    }
    /**
     * Gets the maximum value of the slider.
     * @returns {number} - The maximum value.
     */
    getMax() {
        return parseInt(this.slider.max);
    }
    /**
     * Gets the current value of the slider.
     * @returns {number} - The current value.
     */
    getValue() {
        return parseInt(this.slider.value);
    }
    /**
     * Sets the value of the slider.
     * @param {number} value - The desired value.
     */
    setValue(value) {
        this.slider.value = String(value);
        this.onChangeCallback();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvc2xpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFJZjs7OztPQUlHO0lBQ0gsWUFBWSxFQUFVLEVBQUUsZ0JBQTRCO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQXFCLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNO1FBQ0YsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTTtRQUNGLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDSixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsS0FBYTtRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNKIn0=