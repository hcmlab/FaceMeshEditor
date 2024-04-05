import {Point2D} from "./point2d";

export class Point3D extends Point2D {
    constructor(id: number, x: number, y: number, z: number, neighbourIds: number[]) {
        super(id, x, y, neighbourIds);
        this._z = z;
    }

    private _z: number;

    get z(): number {
        return this._z;
    }

    set z(value: number) {
        this._z = value;
    }

    toString() {
        return 'Point3D(id=' + this.getId() + ', x=' + this.x + ', y=' + this.y + ', z=' + this.z + ')';
    }

    clone() {
        let copy = new Point3D(this.getId(), this.x, this.y, this.z, this.getNeighbourIds());
        copy.hovered = this.hovered;
        copy.deleted = this.deleted;
        copy.selected = this.selected;
        return copy;
    }
}