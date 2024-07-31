import $ from 'jquery';

/**
 * Represents a canvas-based thumbnail for an image.
 */
export class Thumbnail {
  private readonly a: HTMLAnchorElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly iconContainer: HTMLHeadingElement;
  private readonly icon: HTMLElement;
  private readonly iconDescription: HTMLSpanElement;
  private readonly onClickCallback: (filename: string) => void;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement = new Image();

  /**
   * Creates a new Thumbnail instance.
   * @param {(filename: string) => void} onClickCallback - A callback function to execute when the thumbnail is clicked.
   * @param {number} imageSize - The desired size (width and height) of the thumbnail canvas.
   */
  constructor(onClickCallback: (filename: string) => void, imageSize: number = 100) {
    this.onClickCallback = onClickCallback;
    this.a = document.createElement('a');
    this.a.className = 'overlap-container w-15vh h-15vh my-1';
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'img-thumbnail d-block w-100 rounded';
    this.canvas.width = imageSize;
    this.canvas.height = imageSize;
    this.ctx = this.canvas.getContext('2d')!;
    this.image.onload = () => this.draw();
    this.a.href = '#';
    this.a.onclick = (_) => {
      return false;
    };
    this.a.appendChild(this.canvas);

    // Info icon if image was saved
    this.iconContainer = document.createElement('div');
    this.iconContainer.className =
      'p-1 w-100 h-100 bg-dark bg-opacity-50 rounded border border-dark d-flex justify-content-center align-items-center d-none';
    this.iconDescription = document.createElement('span');
    this.iconDescription.className = 'visually-hidden';
    this.icon = document.createElement('i');
    this.icon.className = 'bi bi-floppy';
    this.icon.style.fontSize = '6vh';

    this.iconContainer.appendChild(this.icon);
    this.iconContainer.appendChild(this.iconDescription);
    this.a.appendChild(this.iconContainer);
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
    this.a.id = 'thumbnail_' + file.name.replace(/\./g, '_');
  }

  static setStatus(filename: string, status: saveStatus) {
    filename = filename.replace(/\./g, '_');
    const container = $('#thumbnail_' + filename);
    const iconContainer = container.find('div');
    const icon = iconContainer.find('i');
    const iconDescription = container.find('span');
    switch (status) {
      case saveStatus.unedited: {
        iconContainer.addClass('d-none');
        icon.removeClass().addClass('bi bi-floppy text-secondary');
        iconDescription.text('Annotation has not been Edited');
        break;
      }
      case saveStatus.edited: {
        // edited, unsaved -> yellow
        iconContainer.removeClass('d-none');
        icon.removeClass().addClass('bi bi-floppy text-warning');
        iconDescription.text('Annotation has been changed but not saved');
        break;
      }
      case saveStatus.saved: {
        // edited, saved -> green
        icon.removeClass().addClass('bi bi-check text-success');
        iconDescription.text('Annotation has been saved');
        break;
      }
    }
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
    this.ctx.drawImage(this.image, offX, offY, this.image.width * scale, this.image.height * scale);
  }
}

export enum saveStatus {
  unedited = 'unedited',
  edited = 'edited',
  saved = 'saved'
}
