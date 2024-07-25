import { AdvancedCanvas } from '../view/AdvancedCanvas';
import { EventManager } from '../util/EventManager';

export abstract class AbstractViewer {
  public readonly advancedCanvas: AdvancedCanvas;
  public readonly onDrawEventManager: EventManager<void>;
  protected readonly ctx: CanvasRenderingContext2D;

  /**
   * Initializes the AbstractViewer instance by setting up the canvas and event listeners.
   * @param {AdvancedCanvas} canvas - The canvas to work on.
   */
  protected constructor(canvas: AdvancedCanvas) {
    this.advancedCanvas = canvas;
    this.onDrawEventManager = canvas.onDrawEventManager;
    this.ctx = canvas.ctx;
    this.onDrawEventManager.subscribe(() => this.draw());
  }

  /**
   * Draws onto the canvas with the current zoom and pan transformations applied.
   */
  abstract draw(): void
}