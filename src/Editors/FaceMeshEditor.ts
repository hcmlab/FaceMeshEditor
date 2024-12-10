import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { type CanvasGradient, type CanvasPattern } from 'canvas';
import { Point2D } from '@/graph/point2d';
import { Perspective2D } from '@/graph/perspective2d';
import { Graph } from '@/graph/graph';
import {
  Connection,
  FACE_LANDMARKS_NOSE,
  UPDATED_LEFT_IRIS,
  UPDATED_RIGHT_IRIS
} from '@/graph/face_landmarks_features';
import { useFaceMeshConfig } from '@/stores/ToolSpecific/faceMeshConfig';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { Editor } from '@/Editors/Editor';
import { SaveStatus } from '@/enums/saveStatus';
import { AnnotationTool } from '@/enums/annotationTool';

const COLOR_POINT_HOVERED = 'rgba(255,250,163,0.6)';

const COLOR_POINT_SELECTED = 'rgba(255,250,58,0.6)';

const COLOR_POINT_DEFAULT = '#0d6efd';

const COLOR_EDGES_TESSELATION = '#d5d5d5';

const COLOR_EDGES_FACE_OVAL = '#42ffef';

const COLOR_EDGES_LIPS = '#ff0883';

const COLOR_EDGES_RIGHT_EYE = '#b3ff42';

const COLOR_EDGES_RIGHT_IRIS = '#efffd8';

const COLOR_EDGES_LEFT_EYE = '#42c6ff';

const COLOR_EDGES_LEFT_IRIS = '#b5ebff';

const COLOR_EDGES_NOSE = '#eada70';

const LINE_WIDTH_DEFAULT = 2;

const POINT_WIDTH = 3;

const POINT_EXTENDED_WIDTH = 5;

export class FaceMeshEditor extends Editor {
  private readonly editorConfigStore = useFaceMeshConfig();
  private readonly annotationHistoryStore = useAnnotationHistoryStore();

  constructor() {
    super();

    // Size canvas
    this.editorConfigStore.$subscribe(() => {
      Editor.draw();
    });
    this.annotationHistoryStore.$subscribe(() => {
      this.graph = this.annotationHistoryStore.selectedHistory?.get();
      Editor.draw();
    });

    Editor.add(this);
  }

  private _graph: Graph<Point2D> = new Graph<Point2D>([]);

  get graph(): Graph<Point2D> {
    return this._graph;
  }

  set graph(value: Graph<Point2D> | null | undefined) {
    if (value) {
      this._graph = value.clone();
    }
  }

  get tool(): AnnotationTool {
    return AnnotationTool.FaceMesh;
  }

  draw(): void {
    // Draw Mesh
    if (this.editorConfigStore.showTesselation) {
      this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_TESSELATION, COLOR_EDGES_TESSELATION);
    }
    this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, COLOR_EDGES_FACE_OVAL);
    this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_LIPS, COLOR_EDGES_LIPS);
    this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, COLOR_EDGES_RIGHT_EYE);
    this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, COLOR_EDGES_RIGHT_EYE);
    this.drawFaceTrait(UPDATED_RIGHT_IRIS, COLOR_EDGES_RIGHT_IRIS);
    this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, COLOR_EDGES_LEFT_EYE);
    this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, COLOR_EDGES_LEFT_EYE);
    this.drawFaceTrait(UPDATED_LEFT_IRIS, COLOR_EDGES_LEFT_IRIS);
    this.drawFaceTrait(FACE_LANDMARKS_NOSE, COLOR_EDGES_NOSE);
  }

  private drawPoint(point: Point2D): void {
    if (point && !point.deleted) {
      const projectedPoint = Perspective2D.project(Editor.image, point);

      if (point.hovered || point.selected) {
        const color = point.hovered ? COLOR_POINT_HOVERED : COLOR_POINT_SELECTED;
        Editor.drawCircleAtPoint(
          Editor.ctx,
          color,
          projectedPoint.x,
          projectedPoint.y,
          POINT_EXTENDED_WIDTH / Editor.zoomScale
        );
      }

      Editor.ctx.beginPath();
      Editor.ctx.fillStyle = COLOR_POINT_DEFAULT;
      Editor.ctx.arc(
        projectedPoint.x,
        projectedPoint.y,
        POINT_WIDTH / Editor.zoomScale,
        0,
        Math.PI * 2
      );
      Editor.ctx.fill();
    }
  }

  private drawFaceTrait(
    connections: Connection[],
    color: string | CanvasGradient | CanvasPattern
  ): void {
    if (this.graph) {
      const pointPairs = connections.map((connection) => {
        return {
          start: this.graph.getById(connection.start),
          end: this.graph.getById(connection.end)
        };
      });
      // Draw edges
      Editor.ctx.beginPath();
      Editor.ctx.strokeStyle = color;
      Editor.ctx.lineWidth = LINE_WIDTH_DEFAULT / Editor.zoomScale;
      pointPairs.forEach((connection) => {
        let startPoint = connection.start;
        let endPoint = connection.end;
        if (startPoint && endPoint && !startPoint.deleted && !endPoint.deleted) {
          startPoint = Perspective2D.project(Editor.image, startPoint);
          endPoint = Perspective2D.project(Editor.image, endPoint);
          Editor.ctx.moveTo(startPoint.x, startPoint.y);
          Editor.ctx.lineTo(endPoint.x, endPoint.y);
        }
      });
      Editor.ctx.stroke();
      // Draw points
      pointPairs.forEach((connection) => {
        const startPoint = connection.start;
        const endPoint = connection.end;
        if (!startPoint || !endPoint) return;
        this.drawPoint(startPoint);
        this.drawPoint(endPoint);
      });
    }
  }

  onMove(relativeMouseX: number, relativeMouseY: number): void {
    // Update normalized coordinates based on mouse position
    const alreadyUpdated = new Set();
    const relativeMouseNormalized = Perspective2D.unproject(
      Editor.image,
      new Point2D(-1, relativeMouseX, relativeMouseY, [])
    );
    const selectedPoint = this.graph.getSelected();
    let neighbourPoints = [selectedPoint];
    if (!selectedPoint) {
      return;
    }
    const deltaX = relativeMouseNormalized.x - selectedPoint.x;
    const deltaY = relativeMouseNormalized.y - selectedPoint.y;
    // eslint-disable-next-line no-loops/no-loops
    for (let depth = 0; depth <= this.editorConfigStore.dragDepth; depth++) {
      // Go through each depth step
      let tmpPoints: Point2D[] = [];
      neighbourPoints.forEach((neighbour) => {
        if (!neighbour) {
          return;
        }
        const influenceFactor = Math.exp(-depth);
        const newX = neighbour.x + deltaX * influenceFactor;
        const newY = neighbour.y + deltaY * influenceFactor;
        const newPoint = new Point2D(-1, newX, newY, []);
        neighbour.moveTo(newPoint);
        alreadyUpdated.add(neighbour.id);
        // extract next depth of neighbours
        const neighbors = this.graph.getNeighbourPointsOf(neighbour);
        if (neighbors) {
          tmpPoints = tmpPoints.concat(
            neighbors.filter((point): point is Point2D => point !== undefined)
          );
        }
      });
      neighbourPoints = tmpPoints.filter((p) => !alreadyUpdated.has(p.id));
    }
  }

  onPan(_: number, __: number): void {
    // Nothing to do here, everything is handled by containing component
  }

  onMouseDown(event: MouseEvent): void {
    // Check if any normalized 3D point is clicked
    if (event.button === 0) {
      // left button
      this._graph.points
        .filter((p) => p.hovered && !p.deleted)
        .forEach((p) => {
          p.selected = true;
          Editor.isMoving = true;
        });
      if (!Editor.isMoving) {
        Editor.isPanning = true;
      }
    } else if (event.button === 1) {
      // wheel button
    } else if (event.button === 2) {
      // right click
    }
  }
  onMouseMove(_: MouseEvent, relativeMouseX: number, relativeMouseY: number): void {
    let pointHover = false;
    const relativeMouse = Perspective2D.unproject(
      Editor.image,
      new Point2D(-1, relativeMouseX, relativeMouseY, [])
    );
    this._graph.points.forEach((point) => {
      if (
        !pointHover &&
        Perspective2D.intersects(
          Editor.image,
          point,
          relativeMouse,
          POINT_EXTENDED_WIDTH / Editor.zoomScale
        )
      ) {
        point.hovered = true;
        pointHover = true;
      } else {
        pointHover ||= point.hovered; // Also update if one point gets un-hovered!
        point.hovered = false;
      }
    });
    if (pointHover) {
      Editor.draw();
    }
  }

  onMouseUp(_: MouseEvent) {
    this._graph.points.forEach((point) => (point.selected = false));
  }

  onBackgroundLoaded() {
    this.graph = this.annotationHistoryStore.selectedHistory?.get();
  }

  onPointsEdited() {
    const history = this.annotationHistoryStore.selectedHistory;
    if (!history) {
      return;
    }
    history.add(this._graph);
    history.status = SaveStatus.edited;
  }
}
