import { Point2D } from "./point2d";
/**
 * Represents a graph of points in a 2D space.
 * @template P - Type of the points (must extend Point2D).
 */
export declare class Graph<P extends Point2D> {
    private readonly _points;
    /**
     * Creates a new Graph instance with the given points.
     * @param {P[]} points - An array of points.
     */
    constructor(points: P[]);
    /**
     * Gets the array of points in the graph.
     * @returns {P[]} - An array of points.
     */
    get points(): P[];
    /**
     * Creates a Graph instance from a JSON object.
     * @param {P[]} jsonObject - An array of point objects in JSON format.
     * @param {() => P} newObject - A function to create a new point object.
     * @returns {Graph<P>} - A new Graph instance.
     */
    static fromJson<P extends Point2D>(jsonObject: P[], newObject: () => P): Graph<P>;
    /**
     * Retrieves a point from the graph by its ID.
     * @param {number} id - The ID of the point.
     * @returns {P} - The point with the specified ID.
     */
    getById(id: number): P;
    /**
     * Retrieves the neighboring points of a given point.
     * @param {P} point - The point for which neighbors are requested.
     * @returns {P[]} - An array of neighboring points.
     */
    getNeighbourPointsOf(point: P): P[];
    /**
     * Gets the selected point (if any) from the graph.
     * @returns {P | undefined} - The selected point or undefined if none is selected.
     */
    getSelected(): P | undefined;
    /**
     * Creates a shallow copy of the graph.
     * @returns {Graph<P>} - A new Graph instance with cloned points.
     */
    clone(): Graph<P>;
    /**
     * Converts the graph to an array of dictionaries.
     * @returns {any[]} - An array of dictionaries representing the points.
     */
    toDictArray(): any[];
}
