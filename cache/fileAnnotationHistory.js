"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAnnotationHistory = void 0;
/**
 * Represents a history of annotations for a specific file.
 * Keeps track of changes made to a graph of points (e.g., annotations on an image).
 * @template T - Type of the points (must extend Point2D).
 */
class FileAnnotationHistory {
    /**
     * Creates a new FileAnnotationHistory instance.
     * @param {File} file - The file associated with the annotations.
     * @param {number} cacheSize - The maximum number of history entries to retain.
     */
    constructor(file, cacheSize) {
        this.history = [];
        this.currentHistoryIndex = 0;
        this._file = file;
        this.cacheSize = cacheSize;
    }
    /**
     * Gets the associated file.
     * @returns {File} - The file associated with the annotations.
     */
    get file() {
        return this._file;
    }
    /**
     * Adds a new annotation item to the history.
     * @param {Graph<T>} item - The graph of points representing the annotation.
     */
    add(item) {
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
    setIndex(index) {
        if (index < 0) {
            index = 0;
        }
        else if (index >= this.history.length) {
            index = this.history.length - 1;
        }
        this.currentHistoryIndex = index;
    }
    /**
     * Moves to the next history entry.
     */
    next() {
        this.setIndex(this.currentHistoryIndex + 1);
    }
    /**
     * Moves to the previous history entry.
     */
    previous() {
        this.setIndex(this.currentHistoryIndex - 1);
    }
    /**
     * Retrieves the current annotation graph.
     * @returns {null | Graph<T>} - The current annotation graph or null if empty.
     */
    get() {
        if (!this.isEmpty()) {
            return this.history[this.currentHistoryIndex];
        }
        return null;
    }
    /**
     * Checks if the history is empty.
     * @returns {boolean} - True if empty, false otherwise.
     */
    isEmpty() {
        return this.history.length === 0;
    }
    /**
     * Clears the entire history.
     */
    clear() {
        this.history.length = 0;
        this.currentHistoryIndex = 0;
    }
}
exports.FileAnnotationHistory = FileAnnotationHistory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUFubm90YXRpb25IaXN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NhY2hlL2ZpbGVBbm5vdGF0aW9uSGlzdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQTs7OztHQUlHO0FBQ0gsTUFBYSxxQkFBcUI7SUFNOUI7Ozs7T0FJRztJQUNILFlBQVksSUFBVSxFQUFFLFNBQWlCO1FBVGpDLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBU3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUcsQ0FBQyxJQUFjO1FBQ2QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3BELDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3hDLG9FQUFvRTtZQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNiO2FBQU0sSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDckMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRztRQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBOUZELHNEQThGQyJ9