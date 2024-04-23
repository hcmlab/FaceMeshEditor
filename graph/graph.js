"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
/**
 * Represents a graph of points in a 2D space.
 * @template P - Type of the points (must extend Point2D).
 */
class Graph {
    /**
     * Creates a new Graph instance with the given points.
     * @param {P[]} points - An array of points.
     */
    constructor(points) {
        this._points = points;
    }
    /**
     * Gets the array of points in the graph.
     * @returns {P[]} - An array of points.
     */
    get points() {
        return this._points;
    }
    /**
     * Creates a Graph instance from a JSON object.
     * @param {P[]} jsonObject - An array of point objects in JSON format.
     * @param {() => P} newObject - A function to create a new point object.
     * @returns {Graph<P>} - A new Graph instance.
     */
    static fromJson(jsonObject, newObject) {
        return new Graph(jsonObject.map(dict => Object.assign(newObject(), dict)));
    }
    /**
     * Retrieves a point from the graph by its ID.
     * @param {number} id - The ID of the point.
     * @returns {P} - The point with the specified ID.
     */
    getById(id) {
        // @ts-ignore
        return this.points.find(p => p.id === id);
    }
    /**
     * Retrieves the neighboring points of a given point.
     * @param {P} point - The point for which neighbors are requested.
     * @returns {P[]} - An array of neighboring points.
     */
    getNeighbourPointsOf(point) {
        return point.getNeighbourIds().map(id => this.getById(id));
    }
    /**
     * Gets the selected point (if any) from the graph.
     * @returns {P | undefined} - The selected point or undefined if none is selected.
     */
    getSelected() {
        return this.points.find(p => p.selected && p.hovered);
    }
    /**
     * Creates a shallow copy of the graph.
     * @returns {Graph<P>} - A new Graph instance with cloned points.
     */
    clone() {
        // @ts-ignore
        return new Graph(this.points.map(p => p.clone()));
    }
    /**
     * Converts the graph to an array of dictionaries.
     * @returns {any[]} - An array of dictionaries representing the points.
     */
    toDictArray() {
        return this.points.map(point => point.toDict());
    }
}
exports.Graph = Graph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ3JhcGgvZ3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7OztHQUdHO0FBQ0gsTUFBYSxLQUFLO0lBR2Q7OztPQUdHO0lBQ0gsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBb0IsVUFBZSxFQUFFLFNBQWtCO1FBQ2xFLE9BQU8sSUFBSSxLQUFLLENBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLEVBQVU7UUFDZCxhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxvQkFBb0IsQ0FBQyxLQUFRO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSztRQUNELGFBQWE7UUFDYixPQUFPLElBQUksS0FBSyxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0o7QUF4RUQsc0JBd0VDIn0=