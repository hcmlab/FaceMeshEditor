import { ModelApi } from "./modelApi";
import { Graph } from "../graph/graph";
import { Point2D } from "../graph/point2d";
/**
 * Represents a model using MediaPipe for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export declare class MediapipeModel implements ModelApi<Point2D> {
    private meshLandmarker;
    /**
     * Creates a new MediapipeModel instance.
     */
    constructor();
    detect(imageFile: File): Promise<Graph<Point2D>>;
    uploadAnnotations(_: string): Promise<void>;
}
