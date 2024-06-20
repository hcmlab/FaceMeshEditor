/**
 * Represents a canvas-based thumbnail for an image.
 */
export class Thumbnail {
  private readonly a: HTMLAnchorElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly onClickCallback: (filename: string) => void;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement = new Image();

  /**
   * Creates a new Thumbnail instance.
   * @param {(filename: string) => void} onClickCallback - A callback function to execute when the thumbnail is clicked.
   * @param {number} imageSize - The desired size (width and height) of the thumbnail canvas.
   */
  constructor(
    onClickCallback: (filename: string) => void,
    imageSize: number = 100,
  ) {
    this.onClickCallback = onClickCallback;
    this.a = document.createElement('a');
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'img-thumbnail d-block w-100';
    this.canvas.width = imageSize;
    this.canvas.height = imageSize;
    this.ctx = this.canvas.getContext('2d');
    this.image.onload = () => this.draw();
    this.a.href = '#';
    this.a.onclick = (_) => {
      return false;
    };
    this.a.appendChild(this.canvas);
  }

  /**
   * Sets the image source for the thumbnail.
   * @param {File} file - The image file.
   */
  setSource(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (result) {
        this.image.src = result.toString();
      }
    };
    reader.readAsDataURL(file);
    this.a.onclick = () => {
      this.onClickCallback(file.name);
      return false;
    };
  }

  /**
   * Converts the Thumbnail to an HTML element.
   * @returns {HTMLElement} - The HTML anchor element containing the thumbnail canvas.
   */
  toHtml(): HTMLElement {
    return this.a;
  }

  /**
   * Draws the image on the canvas, maintaining aspect ratio and centering it.
   */
  private draw(): void {
    // Set canvas to be a square
    const size = this.canvas.offsetWidth;
    this.canvas.width = size;
    this.canvas.height = size;

    // Calculate scale factor and offsets
    const scale = size / Math.max(this.image.width, this.image.height);
    const offX = (size - this.image.width * scale) / 2;
    const offY = (size - this.image.height * scale) / 2;

    // Clear and fill the entire canvas
    this.ctx.fillStyle = 'rgba(0,0,0,1)';
    this.ctx.fillRect(0, 0, size, size);

    // Draw the image on canvas, maintaining aspect ratio and centering
    this.ctx.drawImage(
      this.image,
      offX,
      offY,
      this.image.width * scale,
      this.image.height * scale,
    );
  }
}
