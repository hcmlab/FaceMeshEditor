import { Graph } from "../graph/graph";
import { Point2D } from "../graph/point2d";
/**
 * Represents an interface for a model API that performs face landmark detection.
 * @template P - Type of the points (must extend Point2D).
 */
export interface ModelApi<P extends Point2D> {
    /**
     * Detects face landmarks in the provided image file.
     * @param {File} imageFile - The image file to analyze.
     * @returns {Promise<Graph<Point2D>>} - A promise resolving to a graph of detected face landmarks.
     */
    detect(imageFile: File): Promise<Graph<P>>;
    /**
     * Uploads annotations.
     * @param {string} annotationsJson - A JSON string containing annotation data.
     * @returns {Promise<void>} - A promise that resolves when the upload is complete.
     */
    uploadAnnotations(annotationsJson: string): Promise<void>;
}
