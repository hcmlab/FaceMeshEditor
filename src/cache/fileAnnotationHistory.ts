import { Point2D } from '@/graph/point2d';
import { Graph } from '@/graph/graph';
import { ImageFile } from '@/imageFile';
import { SaveStatus } from '@/enums/saveStatus';

/**
 * Represents a history of annotations for a specific file.
 * Keeps track of changes made to a graph of points (e.g., annotations on an image).
 * @template T - Type of the points (must extend Point2D).
 */
export class FileAnnotationHistory<T extends Point2D> {
  private readonly cacheSize: number;
  private history: Graph<T>[] = [];
  private currentHistoryIndex: number = 0;
  private readonly _file: ImageFile;
  private _status: SaveStatus;

  /**
   * Creates a new FileAnnotationHistory instance.
   * @param {ImageFile} file - The file associated with the annotations.
   * @param {number} cacheSize - The maximum number of history entries to retain.
   */
  constructor(file: ImageFile, cacheSize: number) {
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

  /**
   * Adds a new annotation item to the history.
   * @param {Graph<T>} item - The graph of points representing the annotation.
   */
  add(item: Graph<T>): void {
    if (this.currentHistoryIndex + 1 < this.history.length) {
      // Delete history stack when moved back and changed something
      this.history.length = this.currentHistoryIndex + 1;
    }
    if (this.cacheSize === this.history.length) {
      // Remove the first item as it is too old and cache limit is reached
      this.history.shift();
    }
    this.history.push(item.clone());
    this.currentHistoryIndex = this.history.length - 1;
  }

  /**
   * Sets the current history index to the specified value.
   * @param {number} index - The desired history index.
   */
  setIndex(index: number): void {
    if (index < 0) {
      index = 0;
    } else if (index >= this.history.length) {
      index = this.history.length - 1;
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
      return this.history[this.currentHistoryIndex];
    }
    return null;
  }

  /**
   * Checks if the history is empty.
   * @returns {boolean} - True if empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.history.length === 0;
  }

  /**
   * Clears the entire history.
   */
  clear() {
    this.history.length = 0;
    this.currentHistoryIndex = 0;
    this._status = SaveStatus.unedited;
  }

  /**
   * Resets the status if item is sent
   */
  markAsSent(): void {
    this._status = SaveStatus.unedited;
  }
}
