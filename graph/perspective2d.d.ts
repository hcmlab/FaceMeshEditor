import { Point2D } from "./point2d";
/**
 * Represents a utility class for 2D perspective transformations.
 */
export declare class Perspective2D {
    /**
     * Converts a normalized point (in the range [0, 1]) to display coordinates (pixel values).
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The corresponding point in display coordinates.
     */
    static normalizedToDisplay(image: HTMLImageElement, point: Point2D): Point2D;
    /**
     * Projects a point from normalized coordinates to display coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The projected point in display coordinates.
     */
    static project(image: HTMLImageElement, point: Point2D): Point2D;
    /**
     * Calculates the Euclidean distance between two points in display coordinates.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} pointFrom - The starting point.
     * @param {Point2D} pointTo - The ending point.
     * @returns {number} - The distance between the two points.
     */
    static distanceTo(image: HTMLImageElement, pointFrom: Point2D, pointTo: Point2D): number;
    /**
     * Checks if two points intersect within a specified delta distance.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} point - The first point.
     * @param {Point2D} pointCheck - The second point to check against.
     * @param {number} delta - The maximum allowed distance for intersection.
     * @returns {boolean} - True if the points intersect within the specified delta, false otherwise.
     */
    static intersects(image: HTMLImageElement, point: Point2D, pointCheck: Point2D, delta: number): boolean;
    /**
     * Converts a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
    static displayToNormalized(image: HTMLImageElement, point: Point2D): Point2D;
    /**
     * Unprojects a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
    static unproject(image: HTMLImageElement, point: Point2D): Point2D;
}
