import { Slider } from './view/slider';
import { CheckBox } from './view/checkbox';
import { Point2D } from './graph/point2d';
import { Editor2D } from './editor2d';
import { Graph } from './graph/graph';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';

export class App {
  private featureDrag: Slider;
  private viewTesselation: CheckBox;
  private thumbnailGallery: JQuery<HTMLElement>;
  private numImages: HTMLOutputElement;
  private editor: Editor2D;
  private readonly cacheSize: number;

  private selectedFile: string | null = null;
  private annotationHistoryStore = useAnnotationHistoryStore();

  constructor(cacheSize: number) {
    this.editor = new Editor2D();
    this.cacheSize = cacheSize;
  }

  openAnnotation(): boolean {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = () => {
      if (input.files?.length <= 0) {
        return;
      }
      const annotationFile: File = input.files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (_) => {
        const jsonString = <{ string: Point2D[] }>JSON.parse(reader.result as string);
        for (const filename of Object.keys(jsonString)) {
          const workingImage = jsonString[filename];
          // skip files without annotation
          if (Object.keys(workingImage).length == 0) {
            continue;
          }
          const graph: Graph<Point2D> = Graph.fromJson(
            workingImage['points'],
            (id) => new Point2D(id, 0, 0, [])
          );
          const history = this.annotationHistoryStore.find(filename, workingImage['sha256']);
          if (history) {
            history.add(graph);
            if (this.selectedFile === filename) {
              this.editor.graph = graph;
            }
          }
        }
        this.editor.draw();
      };
      reader.readAsText(annotationFile);
    };
    input.click();
    return false;
  }

  resizeWindow() {
    this.editor.draw();
  }
}
