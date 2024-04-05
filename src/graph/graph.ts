import {Point2D} from "./point2d";

export class Graph<P extends Point2D> {
    private readonly _points: P[];

    constructor(points: P[]) {
        this._points = points;
    }

    get points(): P[] {
        return this._points;
    }

    static fromJson<P extends Point2D>(jsonObject: P[], newObject: () => P): Graph<P> {
        return new Graph<P>(jsonObject.map(dict => Object.assign(newObject(), dict)));
    }

    getById(id: number): P {
        // @ts-ignore
        return this.points.find(p => p.getId() === id);
    }

    getSelected(): P {
        return this.points.find(p => p.selected && p.hovered);
    }

    clone(): Graph<P> {
        // @ts-ignore
        return new Graph<P>(this.points.map(p => p.clone()));
    }

    toDictArray(): any[] {
        return this.points.map(point => point.toDict());
    }
}