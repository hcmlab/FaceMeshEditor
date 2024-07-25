import { ImageViewer } from '../viewer/ImageViewer';
import { Point2D } from '../annotation/graph/Point2d';
import { Perspective2D } from '../annotation/graph/Perspective2d';
import { Graph } from '../annotation/graph/Graph';
import { Connection } from '../annotation/graph/FaceLandmarksFeatures';
import { EventManager } from '../util/EventManager';

const COLOR_POINT_HOVERED = 'rgba(255,250,163,0.6)';
const COLOR_POINT_SELECTED = 'rgba(255,250,58,0.6)';
const COLOR_POINT_DEFAULT = '#0d6efd';
const POINT_WIDTH = 3;
const POINT_EXTENDED_WIDTH = 5;

export class EditorMesh2D {
  private readonly onDrawEventManager: EventManager<void>;
  private readonly imageViewer: ImageViewer;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private isMoving: boolean = false;
  private onPointsEditedCallback: ((graph: Graph<Point2D>) => void) | null =
    null;
  private _dragDepth: number = 0;
  private meshConfig: {
    connections: Connection[],
    linewidth: number,
    color: string,
    isTesselation: boolean
  }[];

  constructor(imageViewer: ImageViewer, meshConfig: {
    connections: Connection[],
    linewidth: number,
    color: string,
    isTesselation: boolean
  }[]) {
    this.imageViewer = imageViewer;
    this.meshConfig = meshConfig;
    this.onDrawEventManager = imageViewer.onDrawEventManager;
    this.canvas = imageViewer.advancedCanvas.canvas;
    this.ctx = imageViewer.advancedCanvas.ctx;
    // Register event listeners
    this.onDrawEventManager.subscribe(() => this.draw());
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('mouseout', (e) => this.handleMouseUp(e));
  }

  get dragDepth(): number {
    return this._dragDepth;
  }

  set dragDepth(value: number) {
    this._dragDepth = value;
  }

  private _graph: Graph<Point2D> = new Graph<Point2D>([]);

  get graph(): Graph<Point2D> {
    return this._graph;
  }

  set graph(value: Graph<Point2D> | null | undefined) {
    if (value) {
      this._graph = value.clone();
      this.onDrawEventManager.notify();
    }
  }

  private _showTesselation: boolean = false;

  get showTesselation(): boolean {
    return this._showTesselation;
  }

  set showTesselation(value: boolean) {
    this._showTesselation = value;
    this.onDrawEventManager.notify();
  }

  setOnPointsEditedCallback(callback: (graph: Graph<Point2D>) => void) {
    this.onPointsEditedCallback = callback;
  }

  draw(): void {
    this.meshConfig.forEach(config => {
      if (this.showTesselation && config.isTesselation || !config.isTesselation) {
        this.drawFaceTrait(config);
      }
    });
  }

  private drawFaceTrait(
    config: {
      connections: Connection[],
      linewidth: number,
      color: string,
      isTesselation: boolean
    }
  ): void {
    if (this.graph) {
      const pointPairs = config.connections.map((connection) => {
        return {
          start: this.graph.getById(connection.start),
          end: this.graph.getById(connection.end)
        };
      });
      // Draw edges
      this.ctx.beginPath();
      this.ctx.strokeStyle = config.color;
      this.ctx.lineWidth = config.linewidth / this.imageViewer.advancedCanvas.getZoomScale();
      for (const connection of pointPairs) {
        let startPoint = connection.start;
        let endPoint = connection.end;
        if (
          startPoint &&
          endPoint &&
          !startPoint.deleted &&
          !endPoint.deleted
        ) {
          startPoint = Perspective2D.project(this.imageViewer.getImage(), startPoint);
          endPoint = Perspective2D.project(this.imageViewer.getImage(), endPoint);
          this.ctx.moveTo(startPoint.x, startPoint.y);
          this.ctx.lineTo(endPoint.x, endPoint.y);
        }
      }
      this.ctx.stroke();
      // Draw points
      for (const connection of pointPairs) {
        const startPoint = connection.start;
        const endPoint = connection.end;
        this.drawPoint(startPoint);
        this.drawPoint(endPoint);
      }
    }
  }

  private drawPoint(point: Point2D): void {
    const paintPoint = (p: Point2D, width: number, color: string) => {
      this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(
          p.x,
          p.y,
          width / this.imageViewer.advancedCanvas.getZoomScale(),
          0,
          Math.PI * 2
        );
        this.ctx.fill();
    }

    if (point && !point.deleted) {
      const projectedPoint: Point2D = Perspective2D.project(this.imageViewer.getImage(), point);
      if (point.hovered) {
        paintPoint(projectedPoint, POINT_EXTENDED_WIDTH, COLOR_POINT_HOVERED);
      }
      if (point.selected) {
        paintPoint(projectedPoint, POINT_EXTENDED_WIDTH, COLOR_POINT_SELECTED);
      }
      paintPoint(projectedPoint, POINT_WIDTH, COLOR_POINT_DEFAULT);
    }
  }

  // Event handlers for mouse interactions

  private handleMouseDown(event: MouseEvent): void {
    // Check if any normalized 3D point is clicked
    if (event.button === 0) {
      // left button
      this.graph.points
        .filter((p) => p.hovered && !p.deleted)
        .forEach((p) => {
          p.selected = true;
          this.isMoving = true;
        });
    }
  }

  private handleMouseMove(_: MouseEvent): void {
    const mouse = this.imageViewer.advancedCanvas.getRelativeMousePosition();
    if (this.isMoving) {
      this.canvas.style.cursor = 'pointer';
      // Update normalized coordinates based on mouse position
      const alreadyUpdated = new Set();
      const relativeMouse = Perspective2D.unproject(
        this.imageViewer.getImage(),
        new Point2D(-1, mouse.x, mouse.y, [])
      );
      const selectedPoint = this.graph.getSelected();
      let neighbourPoints = [selectedPoint];
      const deltaX = relativeMouse.x - selectedPoint.x;
      const deltaY = relativeMouse.y - selectedPoint.y;
      for (let depth = 0; depth <= this.dragDepth; depth++) {
        // Go through each depth step
        let tmpPoints: Point2D[] = [];
        for (const neigP of neighbourPoints) {
          const influenceFactor = Math.exp(-depth);
          const newX = neigP.x + deltaX * influenceFactor;
          const newY = neigP.y + deltaY * influenceFactor;
          const newPoint = new Point2D(-1, newX, newY, []);
          neigP.moveTo(newPoint);
          alreadyUpdated.add(neigP.id);
          // extract next depth of neighbours
          tmpPoints = tmpPoints.concat(this.graph.getNeighbourPointsOf(neigP));
        }
        neighbourPoints = tmpPoints.filter((p) => !alreadyUpdated.has(p.id));
      }
      // Redraw
      this.onDrawEventManager.notify();
    } else if (this.graph.points.length > 0) {
      let pointHover = false;
      const relativeMouse = Perspective2D.unproject(
        this.imageViewer.getImage(),
        new Point2D(-1, mouse.x, mouse.y, [])
      );
      this.graph.points.forEach((point) => {
        if (
          !pointHover &&
          Perspective2D.intersects(
            this.imageViewer.getImage(),
            point,
            relativeMouse,
            POINT_EXTENDED_WIDTH / this.imageViewer.advancedCanvas.getZoomScale()
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
        this.onDrawEventManager.notify();
      }
    }
  }

  private handleMouseUp(_: MouseEvent): void {
    if (this.isMoving && this.onPointsEditedCallback) {
      this.onPointsEditedCallback(this._graph);
    }
    this.isMoving = false;
    this._graph.points.forEach((point) => (point.selected = false));
  }
}