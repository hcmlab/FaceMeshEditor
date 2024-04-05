import {ModelApi} from "./modelApi";
import {Point2D} from "../graph/point2d";
import {Graph} from "../graph/graph";
import {findNeighbourPointIds} from "../graph/face_landmarks_features";
import {FaceLandmarker} from "@mediapipe/tasks-vision";

/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class WebServiceModel implements ModelApi<Point2D> {
    private readonly url: string;

    /**
     * Creates a new WebServiceModel instance.
     */
    constructor(url: string) {
        this.url = url;
    }

    async detect(imageFile: File): Promise<Graph<Point2D>> {
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'multipart/form-data');

        const formData: FormData = new FormData();
        formData.append('file', imageFile);

        const request: RequestInfo = new Request(this.url + '/detect', {
            method: 'POST',
            headers: headers,
            body: formData
        });

        return fetch(request)
            .then(res => res.json())
            .then(landmarks => landmarks.map((dict, idx) => {
                const ids = Array.from(findNeighbourPointIds(idx, FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
                return new Point2D(idx, dict.x, dict.y, ids);
            }))
            .then(landmarks => new Graph(landmarks));
    }

    async uploadAnnotations(annotationsJson: string): Promise<void> {
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(this.url + '/annotations', {
            method: 'POST',
            headers: headers,
            body: annotationsJson
        });

        return fetch(request).then();
    }
}