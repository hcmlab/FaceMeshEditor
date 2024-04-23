/**
 * Represents a canvas-based thumbnail for an image.
 */
export declare class Thumbnail {
    private readonly a;
    private readonly canvas;
    private readonly onClickCallback;
    private ctx;
    private image;
    /**
     * Creates a new Thumbnail instance.
     * @param {(filename: string) => void} onClickCallback - A callback function to execute when the thumbnail is clicked.
     * @param {number} imageSize - The desired size (width and height) of the thumbnail canvas.
     */
    constructor(onClickCallback: (filename: string) => void, imageSize?: number);
    /**
     * Sets the image source for the thumbnail.
     * @param {File} file - The image file.
     */
    setSource(file: File): void;
    /**
     * Converts the Thumbnail to an HTML element.
     * @returns {HTMLElement} - The HTML anchor element containing the thumbnail canvas.
     */
    toHtml(): HTMLElement;
    /**
     * Draws the image on the canvas, maintaining aspect ratio and centering it.
     */
    private draw;
}
