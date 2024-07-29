import * as bootstrap from 'bootstrap'; // import statically - don't grab it from a cdn
import { Slider } from './view/Slider';
import { CheckBox } from './view/Checkbox';
import { saveStatus, Thumbnail } from './view/Thumbnail';
import { FileAnnotationHistory } from './cache/FileAnnotationHistory';
import { Point2D } from './annotation/graph/Point2d';
import { ImageViewer } from './viewer/ImageViewer';
import { Graph } from './annotation/graph/Graph';
import {
  FACE_FEATURE_LEFT_EYE,
  FACE_FEATURE_LEFT_EYEBROW,
  FACE_FEATURE_LIPS,
  FACE_FEATURE_NOSE,
  FACE_FEATURE_RIGHT_EYE,
  FACE_FEATURE_RIGHT_EYEBROW, FACE_LANDMARKS_NOSE
} from './annotation/graph/FaceLandmarksFeatures';
import { ModelApi } from './model/ModelApi';
import { MediapipeFaceMesh3DModel } from './model/MediapipeFaceMesh3DModel';
import { ModelType } from './model/Models';
import { urlError, WebServiceModel } from './model/Webservice';
import { EditorMesh2D } from './plugins/EditorMesh2d';
import { AdvancedCanvas } from './view/AdvancedCanvas';
import { FaceLandmarker } from '@mediapipe/tasks-vision';


const COLOR_EDGES_TESSELATION = '#d5d5d5';
const COLOR_EDGES_FACE_OVAL = '#42ffef';
const COLOR_EDGES_LIPS = '#ff0883';
const COLOR_EDGES_RIGHT_EYE = '#b3ff42';
const COLOR_EDGES_RIGHT_IRIS = '#efffd8';
const COLOR_EDGES_LEFT_EYE = '#42c6ff';
const COLOR_EDGES_LEFT_IRIS = '#b5ebff';
const COLOR_EDGES_NOSE = '#eada70';
const LINE_WIDTH_DEFAULT = 2;

const meshConfig = [{
    connections: FaceLandmarker.FACE_LANDMARKS_TESSELATION,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_TESSELATION,
    isTesselation: true
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_FACE_OVAL,
    isTesselation: false
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_LIPS,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_LIPS,
    isTesselation: false
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_RIGHT_EYE,
    isTesselation: false
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_RIGHT_EYE,
    isTesselation: false
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_RIGHT_IRIS,
    isTesselation: false
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_LEFT_EYE,
    isTesselation: false
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_LEFT_EYE,
    isTesselation: false
}, {
    connections: FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_LEFT_IRIS,
    isTesselation: false
}, {
    connections: FACE_LANDMARKS_NOSE,
    linewidth: LINE_WIDTH_DEFAULT,
    color: COLOR_EDGES_NOSE,
    isTesselation: false
}];

export class App {
  private featureDrag: Slider;
  private viewTesselation: CheckBox;
  private thumbnailGallery: JQuery<HTMLElement>;
  private numImages: HTMLOutputElement;
  private fileCache: FileAnnotationHistory[] = [];
  private imageViewer: ImageViewer;
  private editorFaceMesh2D: EditorMesh2D;
  private readonly cacheSize: number;
  private readonly models = {
    mediapipe: { model: new MediapipeFaceMesh3DModel(), selected: true },
    custom: { model: null, selected: false }
  };
  private selectedFile: string | null = null;
  private _modelType: ModelType = ModelType.mediapipe;

  get modelType(): ModelType {
    return this._modelType;
  }

  constructor(cacheSize: number) {
    this.cacheSize = cacheSize;
    const canvas = new AdvancedCanvas('canvas-div', 'canvas');
    this.imageViewer = new ImageViewer(canvas);
    this.editorFaceMesh2D = new EditorMesh2D(this.imageViewer, meshConfig);
    this.featureDrag = new Slider('feature_drag', () => {
      // TODO FIX Not working!
      const element = document.getElementById('num') as HTMLOutputElement;
      element.value = this.featureDrag.getValue().toString();
      this.editorFaceMesh2D.dragDepth = this.featureDrag.getValue();
    });
    this.viewTesselation = new CheckBox(
      'view_tesselation',
      () => (this.editorFaceMesh2D.showTesselation = this.viewTesselation.isChecked())
    );
    this.thumbnailGallery = $('#thumbnailGallery');
    this.numImages = document.getElementById('num_images') as HTMLOutputElement;
    this.editorFaceMesh2D.setOnPointsEditedCallback((graph) => {
      if (!this.getSelectedFileHistory()) {
        return;
      }
      const history = this.getSelectedFileHistory();
      history.add(graph);
      Thumbnail.setStatus(history.file.name, saveStatus.edited);
    });
    this.imageViewer.onImageLoadedEvent.subscribe(() => {
      if (this.getSelectedFileHistory()?.isEmpty()) {
        this.runDetection();
      } else {
        this.editorFaceMesh2D.graph = this.getSelectedFileHistory()?.get() as Graph<Point2D>;
      }
    });
  }

  openImage(): boolean {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg, image/jpg';
    input.multiple = true;
    input.onchange = () => {
      if (input.files) {
        const files: File[] = Array.from(input.files);
        for (const f of files) {
          const history = new FileAnnotationHistory(f, this.cacheSize);
          this.fileCache.push(history);
          const thumbnail = new Thumbnail((filename) =>
            this.selectThumbnail(filename)
          );
          thumbnail.setSource(f);
          this.thumbnailGallery.append(thumbnail.toHtml());
          this.numImages.value = this.thumbnailGallery
            .children()
            .length.toString();
        }
        if (files.length > 0) {
          this.imageViewer.setSource(files[0]);
          this.selectedFile = files[0].name;
        }
      }
    };
    input.click();
    return false;
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
        const jsonString = <{ string: Point2D[] }>(
          JSON.parse(reader.result as string)
        );
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
          const cache = this.fileCache.find(
            (f) =>
              f.file.name === filename && f.hash === workingImage['sha256']
          );
          if (cache) {
            cache.add(graph);
            if (this.selectedFile === filename) {
              this.editorFaceMesh2D.graph = graph;
            }
          }
        }
        this.imageViewer.onDrawEventManager.notify();
      };
      reader.readAsText(annotationFile);
    };
    input.click();
    return false;
  }

  private collectAnnotation() {
    const result = {};
    for (const c of this.fileCache) {
      if (!c.readyToSave) {
        continue;
      }
      c.markAsSent();
      const graph = c.get() as Graph<Point2D>;
      result[c.file.name] = {};
      if (graph) {
        result[c.file.name]['points'] = graph.toDictArray();
        result[c.file.name]['sha256'] = c.hash;
      }
    }
    return result;
  }

  saveAnnotation(): boolean {
    if (this.fileCache.length <= 0) {
      return false;
    }

    const result = this.collectAnnotation();
    if (Object.keys(result).length <= 0) {
      return false;
    }

    const jsonData: string = JSON.stringify(result);
    this.getModel().uploadAnnotations(jsonData);
    const dataStr: string =
      'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = dataStr;
    a.download = Date.now() + '_face_mesh_annotations.json';
    a.click();
    return false;
  }

  sendAnnotation(): boolean {
    if (this.fileCache.length <= 0) {
      return false;
    }

    const result = this.collectAnnotation();
    if (Object.keys(result).length <= 0) {
      return false;
    }

    const jsonData: string = JSON.stringify(result);
    this.getModel().uploadAnnotations(jsonData);

    Object.keys(result).forEach((fileName) => {
      Thumbnail.setStatus(fileName, saveStatus.saved);
    });
    return false;
  }

  undo(): boolean {
    this.getSelectedFileHistory()?.previous();
    this.editorFaceMesh2D.graph = this.getSelectedFileHistory()?.get() as Graph<Point2D>;
    return false;
  }

  redo(): boolean {
    this.getSelectedFileHistory()?.next();
    this.editorFaceMesh2D.graph = this.getSelectedFileHistory()?.get() as Graph<Point2D>;
    return false;
  }

  reset(): boolean {
    this.getSelectedFileHistory()?.clear();
    this.runDetection();
    return false;
  }

  addFeatureDrag(value: number): void {
    this.featureDrag.setValue(this.featureDrag.getValue() + value);
  }

  setModel(model: ModelType): boolean {
    if (model === ModelType.custom) {
      $('#sendAnno').show(0.1);
    } else {
      $('#sendAnno').hide(0.1);
    }

    this._modelType = model;

    const btnMediapipe = document.getElementById(
      'btnModelMediapipe'
    ) as HTMLInputElement;
    const btnCustom = document.getElementById(
      'btnModelCustom'
    ) as HTMLInputElement;
    this.models.mediapipe.selected = false;
    this.models.custom.selected = false;
    switch (model) {
      case ModelType.mediapipe: {
        btnMediapipe.checked = true;
        this.models.mediapipe.selected = true;
        break;
      }
      case ModelType.custom: {
        btnCustom.checked = true;
        this.models.custom.selected = true;
        const inputBox = $('#modelurl');
        const url = String(inputBox.val());

        WebServiceModel.verifyUrl(url).then((error) => {
          const errorText = $('#urlErrorText');
          if (error === null) {
            this.models.custom.model = new WebServiceModel(url);
            $('#modalSettingsModel').modal('hide');
            errorText.hide();
            const saveElement = $('#saveNotification')[0];
            const toast = bootstrap.Toast.getOrCreateInstance(saveElement);
            toast.show();
            localStorage.setItem('apiUrl', url);
            const notificationText = $('#saveNotificationText');
            notificationText.text('Webservice url saved!');
            setTimeout(() => {
              toast.hide();
              notificationText.text();
            }, 5000);
          } else {
            // Display error:
            switch (error) {
              case urlError.InvalidUrl: {
                errorText.removeAttr('hidden');
                errorText.text('Please enter a valid URL!');
                break;
              }
              case urlError.Unreachable: {
                errorText.removeAttr('hidden');
                errorText.text('The provided endpoint wasn\'t reachable!');
                break;
              }
            }
            // shake the input window
            inputBox.addClass('wrongInput');
            setTimeout(function() {
              inputBox.removeClass('wrongInput');
            }, 500);
          }
        });
        break;
      }
      default:
        console.error('No model "' + name + '" found to change to!');
        break;
    }
    return false;
  }

  getModel(): ModelApi<Point2D> {
    for (const modelName in this.models) {
      if (this.models[modelName].selected) {
        return this.models[modelName].model;
      }
    }
    return undefined;
  }

  deleteFeature(feature: string): boolean {
    this.getSelectedFileHistory()?.add(this.editorFaceMesh2D.graph);
    switch (feature) {
      case 'left_eye':
        this.deletePoints(FACE_FEATURE_LEFT_EYE);
        break;
      case 'left_eyebrow':
        this.deletePoints(FACE_FEATURE_LEFT_EYEBROW);
        break;
      case 'right_eye':
        this.deletePoints(FACE_FEATURE_RIGHT_EYE);
        break;
      case 'right_eyebrow':
        this.deletePoints(FACE_FEATURE_RIGHT_EYEBROW);
        break;
      case 'nose':
        this.deletePoints(FACE_FEATURE_NOSE);
        break;
      case 'mouth':
        this.deletePoints(FACE_FEATURE_LIPS);
        break;
      default:
        console.error('No feature "' + feature + '" found to delete!');
        break;
    }
    return false;
  }

  selectThumbnail(filename: string): void {
    /* clicking to save */
    if (filename === this.selectedFile) {
      this.getSelectedFileHistory().readyToSave = true;
      Thumbnail.setStatus(filename, saveStatus.saved);
      return;
    }
    this.selectedFile = filename;
    const cache = this.getSelectedFileHistory();
    if (cache) {
      this.imageViewer.setSource(cache.file);
    }
  }

  resizeWindow() {
    this.imageViewer.draw();
  }

  private runDetection() {
    this.getModel()
      ?.detect(this.getSelectedFileHistory().file)
      .then((graph) => {
        if (graph === null) {
          return;
        }
        this.getSelectedFileHistory()?.add(graph);
        this.imageViewer.center();
        this.editorFaceMesh2D.graph = graph;
      });
  }

  getSelectedFileHistory(): FileAnnotationHistory | undefined {
    return this.fileCache.find((c) => c.file.name === this.selectedFile);
  }

  /**
   * Returns true if any files hans pending changes
   */
  anyReadyToSave(): boolean {
    return this.fileCache.some((file) => {
      console.log(file.file.name, ' ', file.readyToSave);
      return file.readyToSave;
    });
  }

  private deletePoints(pointIds: number[]): void {
    const graph = (this.getSelectedFileHistory()?.get() as Graph<Point2D>);
    if (graph) {
      for (const id of pointIds) {
        graph.getById(id).deleted = true;
      }
      this.editorFaceMesh2D.graph = graph;
    }
  }
}

// #####################################################################################################################
// INITIAL
// #####################################################################################################################
window.onload = (_) => {
  const elements: NodeListOf<Element> = document.querySelectorAll(
    '[aria-keyshortcuts]'
  );
  elements.forEach((elem: HTMLElement) => {
    elem.style.cssText = 'width: 100%; text-align: start; padding: .2vw;';
    const keys: string[] = elem.ariaKeyShortcuts
      .split('+')
      .map((k: string) =>
        k
          .replace('Control', 'CTRL')
          .replace('Shift', 'SHIFT')
          .replace('Wheel', 'SCROLL')
      );
    if (elem.ariaKeyShortcuts.length > 0) {
      const table: HTMLTableElement = document.createElement('table');
      table.style.cssText = 'width: 100%';
      const row: HTMLTableRowElement = document.createElement('tr');
      table.appendChild(row);
      const menuTextCol: HTMLTableCellElement = document.createElement('td');
      menuTextCol.innerHTML = elem.innerHTML;
      row.appendChild(menuTextCol);
      const menuShortCutCol: HTMLTableCellElement =
        document.createElement('td');
      menuShortCutCol.style.cssText = 'text-align: end;';
      menuShortCutCol.innerHTML = keys
        .map((k: string) => '<kbd>' + k + '</kbd>')
        .join('+');
      row.appendChild(menuShortCutCol);
      elem.replaceChildren(table);
    }
  });

  const app = new App(25);
  document.getElementById('openFile').onclick = () => app.openImage();
  document.getElementById('openAnno').onclick = () => app.openAnnotation();
  document.getElementById('saveAnno').onclick = () => app.saveAnnotation();
  document.getElementById('undo').onclick = () => app.undo();
  document.getElementById('redo').onclick = () => app.redo();
  document.getElementById('reset').onclick = () => app.reset();
  document.getElementById('btnModelMediapipe').onclick = () =>
    app.setModel(ModelType.mediapipe);
  document.getElementById('btnCloseModal').onclick = () =>
    app.setModel(ModelType.mediapipe);
  document.getElementById('btnCancelModal').onclick = () =>
    app.setModel(ModelType.mediapipe);
  document.getElementById('btnSaveCustomModel').onclick = () =>
    app.setModel(ModelType.custom);
  document.getElementById('feat_le').onclick = (_) =>
    app.deleteFeature('left_eye');
  document.getElementById('feat_leb').onclick = (_) =>
    app.deleteFeature('left_eyebrow');
  document.getElementById('feat_re').onclick = (_) =>
    app.deleteFeature('right_eye');
  document.getElementById('feat_reb').onclick = (_) =>
    app.deleteFeature('right_eyebrow');
  document.getElementById('feat_n').onclick = (_) => app.deleteFeature('nose');
  document.getElementById('feat_m').onclick = (_) => app.deleteFeature('mouth');
  window.onresize = () => app.resizeWindow();
  window.onwheel = (e) => {
    if (e.shiftKey) {
      app.addFeatureDrag(e.deltaY / 100);
    }
  };

  $('#sendAnno')
    .on('click', () => {
      app.sendAnnotation();
    })
    .hide();

  // Either open dialog or send data of some present
  // @ts-expect-error 7030
  $(window).on('beforeunload', () => {
    if (app.anyReadyToSave()) {
      if (app.modelType === ModelType.custom) {
        app.sendAnnotation();
      } else {
        return '?';
      }
    }
  });

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    alert(
      'You are using Safari. This website may not function as expected. ' +
      'Please consider using a different browser.'
    );
  }

  $('#modalSettingsModel').on('shown.bs.modal', function(_) {
    const url = localStorage.getItem('apiUrl');
    if (url) {
      $('#modelurl').val(url);
    }
  });
};
