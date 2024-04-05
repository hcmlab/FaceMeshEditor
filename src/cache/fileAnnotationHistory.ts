import {Point2D} from "../graph/point2d";
import {Graph} from "../graph/graph";

export class FileAnnotationHistory<T extends Point2D> {
    private readonly cacheSize: number;
    private history: Graph<T>[] = [];
    private currentHistoryIndex : number = 0;
    private readonly _file: File;

    constructor(file: File, cacheSize: number) {
        this._file = file;
        this.cacheSize = cacheSize;
    }

    get file(): File {
        return this._file;
    }

    add(item: Graph<T>): void {
        if (this.currentHistoryIndex + 1 < this.history.length) {
            // Delete history stack when moved back and changed something
            this.history.length = this.currentHistoryIndex + 1;
        }
        if (this.cacheSize === this.history.length) {
            // Remove first item as it is too old and cache limit is reached!
            this.history.shift();
        }
        this.history.push(item.clone());
        this.currentHistoryIndex = this.history.length - 1;
    }

    setIndex(index: number): void {
        if (index < 0) {
            index = 0;
        } else if (index >= this.history.length) {
            index = this.history.length - 1;
        }
        this.currentHistoryIndex = index;
        console.log('History: length='+this.history.length + ', index='+index);
    }

    next(): void {
        this.setIndex(this.currentHistoryIndex + 1);
    }

    previous(): void {
        this.setIndex(this.currentHistoryIndex - 1);
    }

    get(): null | Graph<T> {
        if (!this.isEmpty()) {
            return this.history[this.currentHistoryIndex];
        }
        return null;
    }

    isEmpty(): boolean {
        return this.history.length === 0;
    }

    clear() {
        this.history.length = 0;
        this.currentHistoryIndex = 0;
    }
}