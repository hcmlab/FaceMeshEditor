import {
  FaceLandmarker,
  type FaceLandmarkerResult,
  FilesetResolver
} from '@mediapipe/tasks-vision';
import type { ModelApi } from './modelApi';
import { Graph } from '@/graph/graph';
import { Point2D } from '@/graph/point2d';
import { ModelType } from '@/enums/modelType';
import type { ImageFile } from '@/imageFile';

/**
 * Represents a model using MediaPipe for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class MediapipeModel implements ModelApi<Point2D> {
  private meshLandmarker: FaceLandmarker | null = null;

  /**
   * Creates a new MediapipeModel instance.
   */
  constructor() {
    FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )
      .then((filesetResolver) =>
        FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            // When adding user model of same type -> modelAssetBuffer
            delegate: 'CPU'
          },
          minFaceDetectionConfidence: 0.3,
          minFacePresenceConfidence: 0.3,
          runningMode: 'IMAGE',
          numFaces: 1
        })
      )
      .then((landmarker) => (this.meshLandmarker = landmarker));
  }

  async detect(imageFile: ImageFile): Promise<Graph<Point2D>> {
    return new Promise<Graph<Point2D>>((resolve, reject) => {
      const image = new Image();
      image.onload = (_) => {
        const result = this.meshLandmarker?.detect(image);
        if (!result) {
          reject(new Error('Face(s) could not be detected!'));
        }
        const res = Graph.fromMesh((result as FaceLandmarkerResult).faceLandmarks[0]);
        if (!res) {
          reject(new Error('Face(s) could not be detected!'));
        }
        resolve(res as Graph<Point2D>);
      };
      image.src = imageFile.html;
    });
  }

  async uploadAnnotations(_: string): Promise<void | Response> {
    return Promise.resolve();
  }

  type(): ModelType {
    return ModelType.mediapipe;
  }
}
