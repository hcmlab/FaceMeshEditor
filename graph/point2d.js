"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2D = void 0;
/**
 * Represents a 2D point with an ID, coordinates, and neighbor information.
 */
class Point2D {
    /**
     * Creates a new Point2D instance.
     * @param {number} id - The unique identifier for the point.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number[]} neighbourIds - An array of neighbor IDs.
     */
    constructor(id, x, y, neighbourIds) {
        this._selected = false;
        this._hovered = false;
        this._deleted = false;
        this._id = id;
        this._x = x;
        this._y = y;
        this.neighbourIds = neighbourIds;
    }
    /**
     * Gets or sets whether the point is selected.
     * @returns {boolean} - True if selected, false otherwise.
     */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
    }
    /**
     * Gets or sets whether the point is hovered.
     * @returns {boolean} - True if hovered, false otherwise.
     */
    get hovered() {
        return this._hovered;
    }
    set hovered(value) {
        this._hovered = value;
    }
    /**
     * Gets or sets whether the point is marked as deleted.
     * @returns {boolean} - True if deleted, false otherwise.
     */
    get deleted() {
        return this._deleted;
    }
    set deleted(value) {
        this._deleted = value;
    }
    /**
     * Gets or sets the x-coordinate of the point.
     * @returns {number} - The x-coordinate.
     */
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    /**
     * Gets or sets the y-coordinate of the point.
     * @returns {number} - The y-coordinate.
     */
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    /**
     * Returns a string representation of the point.
     * @returns {string} - A formatted string with point details.
     */
    toString() {
        return `Point2D(id=${this.id}, x=${this.x}, y=${this.y})`;
    }
    /**
     * Retrieves the unique ID of the point.
     * @returns {number} - The point's ID.
     */
    get id() {
        return this._id;
    }
    /**
     * Retrieves a copy of the neighbor IDs.
     * @returns {number[]} - An array of neighbor IDs.
     */
    getNeighbourIds() {
        return [...this.neighbourIds];
    }
    /**
     * Moves the point to the specified coordinates.
     * @param {Point2D} point - The target point.
     */
    moveTo(point) {
        this.x = point.x;
        this.y = point.y;
    }
    /**
     * Creates a shallow copy of the point.
     * @returns {Point2D} - A new Point2D instance with cloned properties.
     */
    clone() {
        let copy = new Point2D(this.id, this._x, this._y, this.neighbourIds);
        copy.hovered = this.hovered;
        copy.deleted = this.deleted;
        copy.selected = this.selected;
        return copy;
    }
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
    toDict() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            // hovered: this.hovered,
            deleted: this.deleted,
        };
    }
}
exports.Point2D = Point2D;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaC9wb2ludDJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBSWhCOzs7Ozs7T0FNRztJQUNILFlBQVksRUFBVSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsWUFBc0I7UUFPNUQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQWMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBYzFCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFsQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFJRDs7O09BR0c7SUFDSCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUlEOzs7T0FHRztJQUNILElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBSUQ7OztPQUdHO0lBQ0gsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFJRDs7O09BR0c7SUFDSCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFDLEtBQWE7UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBSUQ7OztPQUdHO0lBQ0gsSUFBSSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBQyxLQUFhO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDSixPQUFPLGNBQWMsSUFBSSxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxFQUFFO1FBQ0YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlO1FBQ1gsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsS0FBYztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLO1FBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNO1FBQ0YsT0FBTztZQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULHlCQUF5QjtZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FHeEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXBKRCwwQkFvSkMifQ==