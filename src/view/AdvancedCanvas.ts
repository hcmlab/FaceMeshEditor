import { EventManager } from '../util/EventManager';

/**
 * Class representing an advanced canvas with pan and zoom functionality.
 */
export class AdvancedCanvas {
  public readonly onDrawEventManager: EventManager<void> = new EventManager<void>();
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  private zoomScale: number = 1;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private prevMouseX: number = 0;
  private prevMouseY: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;
  public isPanning: boolean = false;
  private readonly _embeddingDiv: string;

  /**
   * Initializes the BaseEditor instance by setting up the canvas and event listeners.
   * @param {string} containerDivId - The id of the div that contains the canvas.
   * @param {string} canvasId - The id of the canvas to be used as editor.
   */
  constructor(containerDivId: string, canvasId: string) {
    this._embeddingDiv = containerDivId;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    // Size canvas
    this.clearAndFitToWindow();
    // Register event listeners
    this.onDrawEventManager.subscribe(() => this.draw());
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('mouseout', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
  }

  /**
   * Gets the current zoom scale.
   * @returns {number} The current zoom scale.
   */
  getZoomScale(): number {
    return this.zoomScale;
  }

  /**
   * Gets the relative mouse position on the canvas.
   * @returns {{x: number, y: number}} The relative mouse position.
   */
  getRelativeMousePosition(): { x: number, y: number } {
    const relativeMouseX = (this.mouseX - this.offsetX) / this.zoomScale;
    const relativeMouseY = (this.mouseY - this.offsetY) / this.zoomScale;
    return { x: relativeMouseX, y: relativeMouseY };
  }

  /**
   * Clears the canvas and resizes it to fit the window.
   */
  clearAndFitToWindow() {
    const canvas = $(this._embeddingDiv);
    this.canvas.width = canvas.innerWidth();
    this.canvas.height = canvas.innerHeight();
  }

  /**
   * Zooms the image in or out based on the boolean parameter. Adjusts the zoom scale and repositions the image to keep the zoom centered around the mouse position.
   *
   * @param {boolean} out - If true, zooms out. If false, zooms in.
   */
  zoom(out: boolean) {
    const dx = (this.mouseX - this.offsetX) / this.zoomScale;
    const dy = (this.mouseY - this.offsetY) / this.zoomScale;
    if (out) {
      this.canvas.style.cursor = 'zoom-out';
      this.zoomScale /= 1.1;
    } else {
      this.canvas.style.cursor = 'zoom-in';
      this.zoomScale *= 1.1;
    }
    // Ensure zoom level is within a reasonable range
    this.zoomScale = Math.min(Math.max(0.1, this.zoomScale), 50);
    // Update offsets
    this.offsetX = this.mouseX - dx * this.zoomScale;
    this.offsetY = this.mouseY - dy * this.zoomScale;
    // Redraw
    this.onDrawEventManager.notify();
  }

  /**
   * Centers the box within the canvas, adjusting the zoom scale to fit the image entirely within the canvas dimensions.
   */
  center(focusWidth: number, focusHeight: number) {
    const scaleX = this.canvas.width / focusWidth;
    const scaleY = this.canvas.height / focusHeight;
    this.zoomScale = scaleX < scaleY ? scaleX : scaleY;
    this.offsetX =
      this.canvas.width / 2 - (focusWidth / 2) * this.zoomScale;
    this.offsetY =
      this.canvas.height / 2 - (focusHeight / 2) * this.zoomScale;
    // Redraw
    this.onDrawEventManager.notify();
  }

  /**
   * Pans the image by updating the offsets based on the provided delta values.
   *
   * @param {number} deltaX - The amount to pan horizontally.
   * @param {number} deltaY - The amount to pan vertically.
   */
  pan(deltaX: number, deltaY: number): void {
    this.canvas.style.cursor = 'move';
    // update offsets
    this.offsetX += deltaX;
    this.offsetY += deltaY;
    // Redraw
    this.onDrawEventManager.notify();
  }

  /**
   * Draws the image onto the canvas with the current zoom and pan transformations applied.
   */
  draw(): void {
    this.clearAndFitToWindow();
    // Set Transformations
    this.ctx.translate(this.offsetX, this.offsetY);
    this.ctx.scale(this.zoomScale, this.zoomScale);
  }

  // Event handlers for mouse interactions and zoom

  /**
   * Handles the mousedown event for initiating panning.
   * @param {MouseEvent} event - The mousedown event.
   */
  private handleMouseDown(event: MouseEvent): void {
    // Check if any normalized 3D point is clicked
    if (event.button === 0) {
      // left button
    } else if (event.button === 1) {
      // wheel button
      this.isPanning = true;
    } else if (event.button === 2) {
      // right click
    }
  }

  /**
   * Handles the mousemove event for panning and updating mouse position.
   * @param {MouseEvent} event - The mousemove event.
   */
  private handleMouseMove(event: MouseEvent): void {
    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
    const canvasPos = $(this.canvas.id).offset();
    this.mouseX = event.clientX - canvasPos.left;
    this.mouseY = event.clientY - canvasPos.top;
    if (this.isPanning) {
      this.pan(this.mouseX - this.prevMouseX, this.mouseY - this.prevMouseY);
    }
  }

  /**
   * Handles the mouseup event to stop panning.
   * @param {MouseEvent} _ - The mouseup event.
   */
  private handleMouseUp(_: MouseEvent): void {
    this.canvas.style.cursor = 'default';
    this.isPanning = false;
  }

  /**
   * Handles the wheel event for zooming in and out.
   * @param {WheelEvent} event - The wheel event.
   */
  private handleWheel(event: WheelEvent): void {
    if (!event.shiftKey) {
      this.zoom(event.deltaY > 0);
      event.preventDefault();
    }
  }
}
