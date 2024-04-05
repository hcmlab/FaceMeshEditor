import {Point2D} from "./point2d";

export class Perspective2D {
    static normalizedToDisplay(image: HTMLImageElement, point: Point2D) {
        let copy = point.clone();
        copy.x = point.x * image.width;
        copy.y = point.y * image.height;
        return copy;
    }

    static project(image: HTMLImageElement, point: Point2D) {
        const displayedPoint = Perspective2D.normalizedToDisplay(image, point);
        let copy = point.clone();
        copy.x = displayedPoint.x;
        copy.y = displayedPoint.y;
        return copy;
    }

    static distanceTo(image: HTMLImageElement, pointFrom: Point2D, pointTo: Point2D): number {
        const projectPointFrom = Perspective2D.project(image, pointFrom);
        const projectPointTo = Perspective2D.project(image, pointTo);
        return Math.sqrt(
            Math.pow((projectPointFrom.x - projectPointTo.x), 2) +
            Math.pow((projectPointFrom.y - projectPointTo.y), 2)
        );
    }

    static intersects(image: HTMLImageElement, point: Point2D, pointCheck: Point2D, delta: number): boolean {
        return this.distanceTo(image, point, pointCheck) <= delta;
    }

    static displayToNormalized(image: HTMLImageElement, point: Point2D) {
        let copy = point.clone();
        copy.x = point.x / image.width;
        copy.y = point.y / image.height;
        return copy;
    }

    static unproject(image: HTMLImageElement, point: Point2D) {
        const normalizedPoint = Perspective2D.displayToNormalized(image, point);
        let copy = point.clone();
        copy.x = normalizedPoint.x;
        copy.y = normalizedPoint.y;
        return copy;
    }
}