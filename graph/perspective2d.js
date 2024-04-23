"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perspective2D = void 0;
/**
 * Represents a utility class for 2D perspective transformations.
 */
class Perspective2D {
    /**
     * Converts a normalized point (in the range [0, 1]) to display coordinates (pixel values).
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The corresponding point in display coordinates.
     */
    static normalizedToDisplay(image, point) {
        let copy = point.clone();
        copy.x = point.x * image.width;
        copy.y = point.y * image.height;
        return copy;
    }
    /**
     * Projects a point from normalized coordinates to display coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The projected point in display coordinates.
     */
    static project(image, point) {
        const displayedPoint = Perspective2D.normalizedToDisplay(image, point);
        let copy = point.clone();
        copy.x = displayedPoint.x;
        copy.y = displayedPoint.y;
        return copy;
    }
    /**
     * Calculates the Euclidean distance between two points in display coordinates.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} pointFrom - The starting point.
     * @param {Point2D} pointTo - The ending point.
     * @returns {number} - The distance between the two points.
     */
    static distanceTo(image, pointFrom, pointTo) {
        const projectPointFrom = Perspective2D.project(image, pointFrom);
        const projectPointTo = Perspective2D.project(image, pointTo);
        return Math.sqrt(Math.pow((projectPointFrom.x - projectPointTo.x), 2) +
            Math.pow((projectPointFrom.y - projectPointTo.y), 2));
    }
    /**
     * Checks if two points intersect within a specified delta distance.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} point - The first point.
     * @param {Point2D} pointCheck - The second point to check against.
     * @param {number} delta - The maximum allowed distance for intersection.
     * @returns {boolean} - True if the points intersect within the specified delta, false otherwise.
     */
    static intersects(image, point, pointCheck, delta) {
        return this.distanceTo(image, point, pointCheck) <= delta;
    }
    /**
     * Converts a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
    static displayToNormalized(image, point) {
        let copy = point.clone();
        copy.x = point.x / image.width;
        copy.y = point.y / image.height;
        return copy;
    }
    /**
     * Unprojects a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
    static unproject(image, point) {
        const normalizedPoint = Perspective2D.displayToNormalized(image, point);
        let copy = point.clone();
        copy.x = normalizedPoint.x;
        copy.y = normalizedPoint.y;
        return copy;
    }
}
exports.Perspective2D = Perspective2D;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc3BlY3RpdmUyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaC9wZXJzcGVjdGl2ZTJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOztHQUVHO0FBQ0gsTUFBYSxhQUFhO0lBQ3RCOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQXVCLEVBQUUsS0FBYztRQUM5RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUF1QixFQUFFLEtBQWM7UUFDbEQsTUFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUF1QixFQUFFLFNBQWtCLEVBQUUsT0FBZ0I7UUFDM0UsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRSxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUN2RCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQXVCLEVBQUUsS0FBYyxFQUFFLFVBQW1CLEVBQUUsS0FBYTtRQUN6RixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQXVCLEVBQUUsS0FBYztRQUM5RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUF1QixFQUFFLEtBQWM7UUFDcEQsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFsRkQsc0NBa0ZDIn0=