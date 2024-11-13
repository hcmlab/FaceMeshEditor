/**
 * Clears the canvas and draws the background image.
 */

import { Editor } from '@/Editors/Editor';
import { AnnotationTool } from '@/enums/annotationTool';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';

export class BackgroundDrawer extends Editor {
  private readonly annotationHistoryStore = useAnnotationHistoryStore();

  constructor() {
    super();

    this.annotationHistoryStore.$subscribe(() => {
      if (!this.annotationHistoryStore.selectedHistory) {
        return;
      }
      Editor.image.src = this.annotationHistoryStore.selectedHistory.file.html;
    });
  }

  draw() {
    // Set Transformations
    Editor.clearAndFitToWindow();
    Editor.ctx.translate(Editor.offsetX, Editor.offsetY);
    Editor.ctx.scale(Editor.zoomScale, Editor.zoomScale);
    Editor.ctx.clearRect(0, 0, Editor.canvas.width, Editor.canvas.height);
    Editor.ctx.drawImage(Editor.image, 0, 0);
  }

  onBackgroundLoaded(): void {}

  onMouseDown(_: MouseEvent): void {}

  onMouseMove(_: MouseEvent, __: number, ___: number): void {}

  onMouseUp(_: MouseEvent): void {}

  onMove(_: number, __: number): void {}

  onPan(_: number, __: number): void {}

  onPointsEdited(): void {}

  get tool(): AnnotationTool {
    return AnnotationTool.BackgroundDrawer;
  }
}
