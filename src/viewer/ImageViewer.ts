import { AdvancedCanvas } from '../view/AdvancedCanvas';
import { AbstractViewer } from './AbstractViewer';
import { EventManager } from '../util/EventManager';

/**
 * Class representing an image viewer with pan and zoom functionality.
 */
export class ImageViewer extends AbstractViewer {
  public readonly onImageLoadedEvent: EventManager<HTMLImageElement> = new EventManager<HTMLImageElement>();
  private image: HTMLImageElement = new Image();

  /**
   * Initializes the ImageViewer instance by setting up the canvas and event listeners.
   * @param {AdvancedCanvas} canvas - The canvas to work on.
   */
  constructor(canvas: AdvancedCanvas) {
    super(canvas);
    this.image.onload = (_) => {
      this.onImageLoadedEvent.notify(this.image);
      this.onDrawEventManager.notify();
    };
  }

  /**
   * Sets the source of the image to be loaded into the canvas.
   * @param {File} source - The image file to be loaded.
   */
  setSource(source: File): void {
    const reader = new FileReader();
    reader.onload = (_) => {
      const result = reader.result;
      if (result) {
        this.image.src = result.toString();
      }
    };
    reader.readAsDataURL(source);
  }

  /**
   * Gets the loaded image.
   * @returns {HTMLImageElement} The loaded image.
   */
  getImage(): HTMLImageElement {
    return this.image;
  }

  /**
   * Centers the image within the canvas, adjusting the zoom scale to fit the image entirely within the canvas dimensions.
   */
  center(): void {
    this.advancedCanvas.center(this.image.width, this.image.height);
  }

  /**
   * Draws the image onto the canvas with the current zoom and pan transformations applied.
   */
  draw(): void {
    this.ctx.drawImage(this.image, 0, 0);
  }
}
