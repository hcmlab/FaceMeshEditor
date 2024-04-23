import { Point2D } from "./point2d";
/**
 * Represents a 3D point with an ID, coordinates, and neighbor information.
 * Extends the base class Point2D.
 */
export declare class Point3D extends Point2D {
    /**
     * Creates a new Point3D instance.
     * @param {number} id - The unique identifier for the point.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number} z - The z-coordinate of the point (additional dimension).
     * @param {number[]} neighbourIds - An array of neighbor IDs.
     */
    constructor(id: number, x: number, y: number, z: number, neighbourIds: number[]);
    private _z;
    /**
     * Gets or sets the z-coordinate of the point.
     * @returns {number} - The z-coordinate.
     */
    get z(): number;
    set z(value: number);
    /**
     * Returns a string representation of the 3D point.
     * @returns {string} - A formatted string with point details.
     */
    toString(): string;
    /**
     * Creates a shallow copy of the 3D point.
     * @returns {Point3D} - A new Point3D instance with cloned properties.
     */
    clone(): Point3D;
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
    toDict(): {
        id: number;
        x: number;
        y: number;
        z: number;
        deleted: boolean;
    };
}
