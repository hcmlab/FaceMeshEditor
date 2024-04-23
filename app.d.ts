import { Point2D } from "./graph/point2d";
import { ModelApi } from "./model/modelApi";
export declare class App {
    private featureDrag;
    private viewTesselation;
    private thumbnailGallery;
    private numImages;
    private fileCache;
    private editor;
    private readonly cacheSize;
    private readonly models;
    private selectedFile;
    constructor(cacheSize: number);
    openImage(): boolean;
    openAnnotation(): boolean;
    saveAnnotation(): boolean;
    undo(): boolean;
    redo(): boolean;
    reset(): boolean;
    addFeatureDrag(value: number): void;
    setModel(name: string): boolean;
    getModel(): ModelApi<Point2D>;
    deleteFeature(feature: string): boolean;
    selectThumbnail(filename: string): void;
    resizeWindow(): void;
    private runDetection;
    private getSelectedFileHistory;
    private deletePoints;
}
