import { Point2D } from '@/graph/point2d';
import { Graph } from '@/graph/graph';
import { ImageFile } from '@/imageFile';
import { SaveStatus } from '@/enums/saveStatus';

export interface PointData {
  deleted: boolean;
  x: number;
  y: number;
  z?: number;
  id: number;
}
export interface GraphData {
  points?: PointData[][];
  sha256?: string;
}

/**
 * Represents a history of annotations for a specific file.
 * Keeps track of changes made to a graph of points (e.g., annotations on an image).
 * @template T - Type of the points (must extend Point2D).
 */
export class FileAnnotationHistory<T extends Point2D> {
  private readonly cacheSize: number;
  private _history: Graph<T>[] = [];
  private currentHistoryIndex: number = 0;
  private readonly _file: ImageFile;
  private _status: SaveStatus;

  /**
   * Creates a new FileAnnotationHistory instance.
   * @param file - The file associated with the annotations.
   * @param cacheSize - The maximum number of history entries to retain. If 0 (default) any amount of data is kept
   */
  constructor(file: ImageFile, cacheSize: number = 0) {
    this._file = file;
    this.cacheSize = cacheSize;
    this._status = SaveStatus.unedited;
  }

  /**
   * Gets the associated file.
   * @returns {File} - The file associated with the annotations.
   */
  get file(): ImageFile {
    return this._file;
  }

  get status(): SaveStatus {
    return this._status;
  }

  set status(value: SaveStatus) {
    this._status = value;
  }

  protected get history() {
    return this._history;
  }

  /**
   * Returns the current history as a plain object.
   * If the user used the "undo" feature, any states in the "future" will be ignored
   */
  protected get toDictArray(): PointData[][] {
    return this._history.slice(0, this.currentHistoryIndex + 1).map((graph) => graph.toDictArray());
  }

  /**
   * returns the serialized data of the history, included file sha.
   */
  get graphData(): GraphData {
    return {
      points: this.toDictArray,
      sha256: this.file.sha
    };
  }

  /**
   * Adds a new annotation item to the history.
   * @param {Graph<T>} item - The graph of points representing the annotation.
   */
  add(item: Graph<T>): void {
    if (this.currentHistoryIndex + 1 < this.history.length) {
      // Delete history stack when moved back and changed something
      this._history.length = this.currentHistoryIndex + 1;
    }
    // only act if a size is provided see Issue #70
    if (this.cacheSize !== 0 && this.cacheSize === this._history.length) {
      // Remove the first item as it is too old and cache limit is reached
      this._history.shift();
    }
    this._history.push(item.clone());
    this.currentHistoryIndex = this._history.length - 1;
  }

  /**
   * Merges an array of Graph items into the current graph instance.
   * Expects the latest item at the last index (-1)
   *
   * @param items - An array of Graph items to be merged.
   */
  merge(items: Graph<T>[]) {
    items.forEach((item) => this.add(item));
  }

  append(other: FileAnnotationHistory<T>) {
    this.merge(other.history);
  }

  /**
   * Sets the current history index to the specified value.
   * @param {number} index - The desired history index.
   */
  setIndex(index: number): void {
    if (index < 0) {
      index = 0;
    } else if (index >= this._history.length) {
      index = this._history.length - 1;
    }
    if (this.currentHistoryIndex !== index) {
      this._status = SaveStatus.edited;
    }
    this.currentHistoryIndex = index;
  }

  /**
   * Moves to the next history entry.
   */
  next(): void {
    this.setIndex(this.currentHistoryIndex + 1);
  }

  /**
   * Moves to the previous history entry.
   */
  previous(): void {
    this.setIndex(this.currentHistoryIndex - 1);
  }

  /**
   * Retrieves the current annotation graph.
   * @returns {null | Graph<T>} - The current annotation graph or null if empty.
   */
  get(): null | Graph<T> {
    if (!this.isEmpty()) {
      return this._history[this.currentHistoryIndex];
    }
    return null;
  }

  /**
   * Checks if the history is empty.
   * @returns {boolean} - True if empty, false otherwise.
   */
  isEmpty(): boolean {
    return this._history.length === 0;
  }

  /**
   * Clears the entire history.
   */
  clear() {
    this._history = [];
    this.currentHistoryIndex = 0;
    this._status = SaveStatus.unedited;
  }

  /**
   * Resets the status if item is sent
   */
  markAsSent(): void {
    this._status = SaveStatus.unedited;
  }

  /**
   * Parses the provided parsed json data into a history. Expects the latest element to be at the end of the array.
   * @param json the parsed data
   * @param file the image file, to check the sha
   * @param newObject a function to create a single Point, used to mitigate the templating.
   */
  static fromJson<T extends Point2D>(
    json: GraphData,
    file: ImageFile,
    newObject: (id: number, neighbors: number[]) => T
  ): FileAnnotationHistory<T> | null {
    const h = new FileAnnotationHistory<T>(file);
    // skip files without annotation
    if (Object.keys(json).length == 0) {
      return null;
    }
    const sha = json.sha256;
    if (!sha) throw new Error('Missing from API!');
    if (sha !== file.sha) throw new Error('Mismatching sha sent from API!');
    let graphs = json.points;
    if (!graphs) throw new Error("Didn't get any points from API!");
    /* backward compatibility if the file contains the old Points2D[] format instead of Points2D[][] */
    if (!Array.isArray(graphs[0])) {
      graphs = [graphs as unknown as PointData[]];
    }
    graphs.forEach((unparsedGraph) => {
      const graph: Graph<T> = Graph.fromJson(unparsedGraph, newObject);
      h.add(graph);
    });
    return h;
  }
}
