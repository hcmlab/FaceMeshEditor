import {Point2D} from "./point2d";

/**
 * Represents a graph of points in a 2D space.
 * @template P - Type of the points (must extend Point2D).
 */
export class Graph<P extends Point2D> {
    private readonly _points: P[];

    /**
     * Creates a new Graph instance with the given points.
     * @param {P[]} points - An array of points.
     */
    constructor(points: P[]) {
        this._points = points;
    }

    /**
     * Gets the array of points in the graph.
     * @returns {P[]} - An array of points.
     */
    get points(): P[] {
        return this._points;
    }

    /**
     * Creates a Graph instance from a JSON object.
     * @param {P[]} jsonObject - An array of point objects in JSON format.
     * @param {() => P} newObject - A function to create a new point object.
     * @returns {Graph<P>} - A new Graph instance.
     */
    static fromJson<P extends Point2D>(jsonObject: P[], newObject: () => P): Graph<P> {
        return new Graph<P>(jsonObject.map(dict => Object.assign(newObject(), dict)));
    }

    /**
     * Retrieves a point from the graph by its ID.
     * @param {number} id - The ID of the point.
     * @returns {P} - The point with the specified ID.
     */
    getById(id: number): P {
        // @ts-ignore
        return this.points.find(p => p.getId() === id);
    }

    /**
     * Retrieves the neighboring points of a given point.
     * @param {P} point - The point for which neighbors are requested.
     * @returns {P[]} - An array of neighboring points.
     */
    getNeighbourPointsOf(point: P): P[] {
        return point.getNeighbourIds().map(id => this.getById(id));
    }

    /**
     * Gets the selected point (if any) from the graph.
     * @returns {P | undefined} - The selected point or undefined if none is selected.
     */
    getSelected(): P | undefined {
        return this.points.find(p => p.selected && p.hovered);
    }

    /**
     * Creates a shallow copy of the graph.
     * @returns {Graph<P>} - A new Graph instance with cloned points.
     */
    clone(): Graph<P> {
        // @ts-ignore
        return new Graph<P>(this.points.map(p => p.clone()));
    }

    /**
     * Converts the graph to an array of dictionaries.
     * @returns {any[]} - An array of dictionaries representing the points.
     */
    toDictArray(): any[] {
        return this.points.map(point => point.toDict());
    }
}
