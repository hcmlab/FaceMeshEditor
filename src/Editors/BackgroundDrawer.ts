import { Editor } from '@/Editors/Editor';
import { AnnotationTool } from '@/enums/annotationTool';

export class BackgroundDrawer extends Editor {
  draw() {
    this.clearAndFitToWindow();
    // Set Transformations
    Editor.ctx.translate(Editor.offsetX, Editor.offsetY);
    Editor.ctx.scale(Editor.zoomScale, Editor.zoomScale);
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
