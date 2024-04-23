"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point3D = void 0;
const point2d_1 = require("./point2d");
/**
 * Represents a 3D point with an ID, coordinates, and neighbor information.
 * Extends the base class Point2D.
 */
class Point3D extends point2d_1.Point2D {
    /**
     * Creates a new Point3D instance.
     * @param {number} id - The unique identifier for the point.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number} z - The z-coordinate of the point (additional dimension).
     * @param {number[]} neighbourIds - An array of neighbor IDs.
     */
    constructor(id, x, y, z, neighbourIds) {
        super(id, x, y, neighbourIds);
        this._z = z;
    }
    /**
     * Gets or sets the z-coordinate of the point.
     * @returns {number} - The z-coordinate.
     */
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
    }
    /**
     * Returns a string representation of the 3D point.
     * @returns {string} - A formatted string with point details.
     */
    toString() {
        return `Point3D(id=${this.id}, x=${this.x}, y=${this.y}, z=${this.z})`;
    }
    /**
     * Creates a shallow copy of the 3D point.
     * @returns {Point3D} - A new Point3D instance with cloned properties.
     */
    clone() {
        let copy = new Point3D(this.id, this.x, this.y, this.z, this.getNeighbourIds());
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
            z: this.z,
            // hovered: this.hovered,
            deleted: this.deleted,
        };
    }
}
exports.Point3D = Point3D;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQzZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaC9wb2ludDNkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFrQztBQUVsQzs7O0dBR0c7QUFDSCxNQUFhLE9BQVEsU0FBUSxpQkFBTztJQUNoQzs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxFQUFVLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsWUFBc0I7UUFDM0UsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFJRDs7O09BR0c7SUFDSCxJQUFJLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFDLEtBQWE7UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNKLE9BQU8sY0FBYyxJQUFJLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDM0UsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNO1FBQ0YsT0FBTztZQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULHlCQUF5QjtZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FHeEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhFRCwwQkFnRUMifQ==