import { Point2D } from "../graph/point2d";
import { Graph } from "../graph/graph";
/**
 * Represents a history of annotations for a specific file.
 * Keeps track of changes made to a graph of points (e.g., annotations on an image).
 * @template T - Type of the points (must extend Point2D).
 */
export declare class FileAnnotationHistory<T extends Point2D> {
    private readonly cacheSize;
    private history;
    private currentHistoryIndex;
    private readonly _file;
    /**
     * Creates a new FileAnnotationHistory instance.
     * @param {File} file - The file associated with the annotations.
     * @param {number} cacheSize - The maximum number of history entries to retain.
     */
    constructor(file: File, cacheSize: number);
    /**
     * Gets the associated file.
     * @returns {File} - The file associated with the annotations.
     */
    get file(): File;
    /**
     * Adds a new annotation item to the history.
     * @param {Graph<T>} item - The graph of points representing the annotation.
     */
    add(item: Graph<T>): void;
    /**
     * Sets the current history index to the specified value.
     * @param {number} index - The desired history index.
     */
    setIndex(index: number): void;
    /**
     * Moves to the next history entry.
     */
    next(): void;
    /**
     * Moves to the previous history entry.
     */
    previous(): void;
    /**
     * Retrieves the current annotation graph.
     * @returns {null | Graph<T>} - The current annotation graph or null if empty.
     */
    get(): null | Graph<T>;
    /**
     * Checks if the history is empty.
     * @returns {boolean} - True if empty, false otherwise.
     */
    isEmpty(): boolean;
    /**
     * Clears the entire history.
     */
    clear(): void;
}
