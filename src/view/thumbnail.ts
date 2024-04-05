export class Thumbnail {
    private readonly a: HTMLAnchorElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly onClickCallback: (filename: string) => void;
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement = new Image();

    /**
     * Creates a new thumbnail canvas.
     *
     * @param onClickCallback when clicked on the thumbnail this will be called.
     * @param imageSize of the image to be displayed.
     */
    constructor(onClickCallback: (filename: string) => void, imageSize: number = 100) {
        this.onClickCallback = onClickCallback;
        this.a = document.createElement('a');
        this.canvas = document.createElement('canvas');
        this.canvas.className = "img-thumbnail m-2 mx-auto d-block";
        this.canvas.width = imageSize;
        this.canvas.height = imageSize;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.image.onload = () => this.draw();
        this.a.href = '#';
        this.a.onclick = _ => {
            return false;
        };
        this.a.appendChild(this.canvas);
    }

    /**
     * Set the source to the image to be displayed and update the on click callback reference.
     *
     * @param file of the image.
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

    toHtml() : HTMLElement {
        return this.a;
    }

    /**
     * Draws the image to the canvas in the correct size and ratio.
     */
    private draw(): void {
        // Compute scale factor
        const scaleX = this.canvas.width / this.image.width;
        const scaleY = this.canvas.height / this.image.height;
        const zoomScale = scaleX < scaleY ? scaleX : scaleY;
        const offX = (this.canvas.width - this.image.width * zoomScale) / 2;
        const offY = (this.canvas.height - this.image.height * zoomScale) / 2;
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, offX, offY, this.image.width * zoomScale, this.image.height * zoomScale);
        this.ctx.restore();
    }
}

// customElements.define('a-thumbnail', Thumbnail, {extends: 'a'});
