"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServiceModel = void 0;
const point2d_1 = require("../graph/point2d");
const graph_1 = require("../graph/graph");
const face_landmarks_features_1 = require("../graph/face_landmarks_features");
const tasks_vision_1 = require("@mediapipe/tasks-vision");
/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
class WebServiceModel {
    /**
     * Creates a new WebServiceModel instance.
     */
    constructor(url) {
        this.url = url;
    }
    async detect(imageFile) {
        const headers = new Headers();
        headers.set('Content-Type', 'multipart/form-data');
        const formData = new FormData();
        formData.append('file', imageFile);
        const request = new Request(this.url + '/detect', {
            method: 'POST',
            headers: headers,
            body: formData
        });
        return fetch(request)
            .then(res => res.json())
            .then(landmarks => landmarks.map((dict, idx) => {
            const ids = Array.from(face_landmarks_features_1.findNeighbourPointIds(idx, tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
            return new point2d_1.Point2D(idx, dict.x, dict.y, ids);
        }))
            .then(landmarks => new graph_1.Graph(landmarks));
    }
    async uploadAnnotations(annotationsJson) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = new Request(this.url + '/annotations', {
            method: 'POST',
            headers: headers,
            body: annotationsJson
        });
        return fetch(request).then();
    }
}
exports.WebServiceModel = WebServiceModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC93ZWJzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUF5QztBQUN6QywwQ0FBcUM7QUFDckMsOEVBQXVFO0FBQ3ZFLDBEQUF1RDtBQUV2RDs7O0dBR0c7QUFDSCxNQUFhLGVBQWU7SUFHeEI7O09BRUc7SUFDSCxZQUFZLEdBQVc7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBZTtRQUN4QixNQUFNLE9BQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFbkQsTUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVuQyxNQUFNLE9BQU8sR0FBZ0IsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLEVBQUU7WUFDM0QsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsUUFBUTtTQUNqQixDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDM0MsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQywrQ0FBcUIsQ0FBQyxHQUFHLEVBQUUsNkJBQWMsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8sSUFBSSxpQkFBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7YUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsZUFBdUI7UUFDM0MsTUFBTSxPQUFPLEdBQVksSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFMUMsTUFBTSxPQUFPLEdBQWdCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsY0FBYyxFQUFFO1lBQ2hFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLGVBQWU7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBN0NELDBDQTZDQyJ9