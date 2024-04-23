/**
 * Represents a 2D point with an ID, coordinates, and neighbor information.
 */
export declare class Point2D {
    private readonly _id;
    private readonly neighbourIds;
    /**
     * Creates a new Point2D instance.
     * @param {number} id - The unique identifier for the point.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number[]} neighbourIds - An array of neighbor IDs.
     */
    constructor(id: number, x: number, y: number, neighbourIds: number[]);
    private _selected;
    /**
     * Gets or sets whether the point is selected.
     * @returns {boolean} - True if selected, false otherwise.
     */
    get selected(): boolean;
    set selected(value: boolean);
    private _hovered;
    /**
     * Gets or sets whether the point is hovered.
     * @returns {boolean} - True if hovered, false otherwise.
     */
    get hovered(): boolean;
    set hovered(value: boolean);
    private _deleted;
    /**
     * Gets or sets whether the point is marked as deleted.
     * @returns {boolean} - True if deleted, false otherwise.
     */
    get deleted(): boolean;
    set deleted(value: boolean);
    private _x;
    /**
     * Gets or sets the x-coordinate of the point.
     * @returns {number} - The x-coordinate.
     */
    get x(): number;
    set x(value: number);
    private _y;
    /**
     * Gets or sets the y-coordinate of the point.
     * @returns {number} - The y-coordinate.
     */
    get y(): number;
    set y(value: number);
    /**
     * Returns a string representation of the point.
     * @returns {string} - A formatted string with point details.
     */
    toString(): string;
    /**
     * Retrieves the unique ID of the point.
     * @returns {number} - The point's ID.
     */
    get id(): number;
    /**
     * Retrieves a copy of the neighbor IDs.
     * @returns {number[]} - An array of neighbor IDs.
     */
    getNeighbourIds(): any[];
    /**
     * Moves the point to the specified coordinates.
     * @param {Point2D} point - The target point.
     */
    moveTo(point: Point2D): void;
    /**
     * Creates a shallow copy of the point.
     * @returns {Point2D} - A new Point2D instance with cloned properties.
     */
    clone(): Point2D;
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
    toDict(): {
        id: number;
        x: number;
        y: number;
        deleted: boolean;
    };
}
