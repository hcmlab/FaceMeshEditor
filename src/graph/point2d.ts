export class Point2D {
    private readonly id: number;
    private neighbourIds: any[];

    constructor(id: number, x: number, y: number, neighbourIds: number[]) {
        this.id = id;
        this._x = x;
        this._y = y;
        this.neighbourIds = neighbourIds;
    }

    private _selected: boolean = false;

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }

    private _hovered: boolean = false;

    get hovered(): boolean {
        return this._hovered;
    }

    set hovered(value: boolean) {
        this._hovered = value;
    }

    private _deleted: boolean = false;

    get deleted(): boolean {
        return this._deleted;
    }

    set deleted(value: boolean) {
        this._deleted = value;
    }

    private _x: number;

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    private _y: number;

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    toString() {
        return 'Point2D(id=' + this.id + ', x=' + this._x + ', y=' + this._y + ')';
    }

    getId() {
        return this.id;
    }

    getNeighbourIds() {
        return [...this.neighbourIds];
    }

    moveTo(point: Point2D): void {
        this.x = point.x;
        this.y = point.y;
    }

    clone() {
        let copy = new Point2D(this.id, this._x, this._y, this.neighbourIds);
        copy.hovered = this.hovered;
        copy.deleted = this.deleted;
        copy.selected = this.selected;
        return copy;
    }

    toDict() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            // hovered: this.hovered,
            deleted: this.deleted,
            // selected: this.selected,
            // neighbourIds: this.neighbourIds
        };
    }
}