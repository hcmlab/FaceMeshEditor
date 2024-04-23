"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const slider_1 = require("./view/slider");
const checkbox_1 = require("./view/checkbox");
const thumbnail_1 = require("./view/thumbnail");
const fileAnnotationHistory_1 = require("./cache/fileAnnotationHistory");
const point2d_1 = require("./graph/point2d");
const editor2d_1 = require("./editor2d");
const graph_1 = require("./graph/graph");
const face_landmarks_features_1 = require("./graph/face_landmarks_features");
const mediapipe_1 = require("./model/mediapipe");
const webservice_1 = require("./model/webservice");
class App {
    constructor(cacheSize) {
        this.fileCache = [];
        this.editor = new editor2d_1.Editor2D();
        this.models = {
            "mediapipe": { "model": new mediapipe_1.MediapipeModel(), "selected": true },
            "custom": { "model": null, "selected": false }
        };
        this.selectedFile = null;
        this.cacheSize = cacheSize;
        this.featureDrag = new slider_1.Slider('feature_drag', () => {
            // TODO FIX Not working!
            const element = document.getElementById('num');
            element.value = this.featureDrag.getValue().toString();
            this.editor.dragDepth = this.featureDrag.getValue();
        });
        this.viewTesselation = new checkbox_1.CheckBox('view_tesselation', () => this.editor.showTesselation = this.viewTesselation.isChecked());
        this.thumbnailGallery = document.getElementById('thumbnailgallery');
        this.numImages = document.getElementById('num_images');
        this.editor.setOnPointsEditedCallback(graph => { var _a; return (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(graph); });
        this.editor.setOnBackgroundLoadedCallback(_ => {
            var _a, _b;
            if ((_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.isEmpty()) {
                this.runDetection();
            }
            else {
                this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
            }
        });
    }
    openImage() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png, image/jpeg";
        input.multiple = true;
        input.onchange = () => {
            if (input.files) {
                const files = Array.from(input.files);
                for (const f of files) {
                    const history = new fileAnnotationHistory_1.FileAnnotationHistory(f, this.cacheSize);
                    this.fileCache.push(history);
                    const thumbnail = new thumbnail_1.Thumbnail(filename => this.selectThumbnail(filename));
                    thumbnail.setSource(f);
                    this.thumbnailGallery.appendChild(thumbnail.toHtml());
                    this.numImages.value = this.thumbnailGallery.children.length.toString();
                }
                if (files.length > 0) {
                    this.editor.setBackgroundSource(files[0]);
                    this.selectedFile = files[0].name;
                }
            }
        };
        input.click();
        return false;
    }
    openAnnotation() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = ".json,application/json";
        input.onchange = () => {
            if (input.files && input.files.length > 0) {
                const annotationFile = input.files[0];
                const reader = new FileReader();
                reader.onload = _ => {
                    const jsonString = JSON.parse(reader.result);
                    for (const filename of Object.keys(jsonString)) {
                        const graph = graph_1.Graph.fromJson(jsonString[filename], () => new point2d_1.Point2D(-1, 0, 0, []));
                        const cache = this.fileCache.find(f => f.file.name === filename);
                        if (cache) {
                            cache.add(graph);
                        }
                    }
                    this.editor.draw();
                };
                reader.readAsText(annotationFile);
            }
        };
        input.click();
        return false;
    }
    saveAnnotation() {
        if (this.fileCache.length > 0) {
            const result = {};
            for (const c of this.fileCache) {
                const graph = c.get();
                if (graph) {
                    result[c.file.name] = graph.toDictArray();
                }
            }
            const jsonData = JSON.stringify(result);
            this.getModel().uploadAnnotations(jsonData);
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = Date.now() + '_face_mesh_annotations.json';
            a.click();
        }
        return false;
    }
    undo() {
        var _a, _b;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.previous();
        this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
        return false;
    }
    redo() {
        var _a, _b;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.next();
        this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
        return false;
    }
    reset() {
        var _a;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.clear();
        this.runDetection();
        return false;
    }
    addFeatureDrag(value) {
        this.featureDrag.setValue(this.featureDrag.getValue() + value);
    }
    setModel(name) {
        const btnMediapipe = document.getElementById('btnModelMediapipe');
        const btnCustom = document.getElementById('btnModelCustom');
        this.models.mediapipe.selected = false;
        this.models.custom.selected = false;
        switch (name) {
            case "mediapipe":
                btnMediapipe.checked = true;
                this.models.mediapipe.selected = true;
                break;
            case "custom":
                btnCustom.checked = true;
                this.models.custom.selected = true;
                const textModelUrl = document.getElementById('modelurl');
                const url = textModelUrl.value;
                const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                // @ts-ignore
                document.getElementById('modalSettingsModel').hide();
                if (!!pattern.test(url)) {
                    this.models.custom.model = new webservice_1.WebServiceModel(url);
                }
                else {
                    this.setModel('mediapipe');
                }
                break;
            default:
                console.error('No model "' + name + '" found to change to!');
                break;
        }
        return false;
    }
    getModel() {
        for (const modelName in this.models) {
            if (this.models[modelName].selected) {
                return this.models[modelName].model;
            }
        }
        return undefined;
    }
    deleteFeature(feature) {
        var _a;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(this.editor.graph);
        switch (feature) {
            case "left_eye":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LEFT_EYE);
                break;
            case "left_eyebrow":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LEFT_EYEBROW);
                break;
            case "right_eye":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_RIGHT_EYE);
                break;
            case "right_eyebrow":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_RIGHT_EYEBROW);
                break;
            case "nose":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_NOSE);
                break;
            case "mouth":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LIPS);
                break;
            default:
                console.error('No feature "' + feature + '" found to delete!');
                break;
        }
        return false;
    }
    selectThumbnail(filename) {
        this.selectedFile = filename;
        const cache = this.getSelectedFileHistory();
        if (cache) {
            this.editor.setBackgroundSource(cache.file);
        }
    }
    resizeWindow() {
        this.editor.draw();
    }
    runDetection() {
        var _a;
        (_a = this.getModel()) === null || _a === void 0 ? void 0 : _a.detect(this.getSelectedFileHistory().file).then(graph => {
            var _a;
            (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(graph);
            this.editor.center();
            this.editor.graph = graph;
        });
    }
    getSelectedFileHistory() {
        return this.fileCache.find(c => c.file.name === this.selectedFile);
    }
    deletePoints(pointIds) {
        var _a;
        const graph = (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.get();
        if (graph) {
            for (const id of pointIds) {
                graph.getById(id).deleted = true;
            }
            this.editor.graph = graph;
        }
    }
}
exports.App = App;
// #####################################################################################################################
// INITIAL
// #####################################################################################################################
window.onload = _ => {
    let elements = document.querySelectorAll('[aria-keyshortcuts]');
    elements.forEach((elem) => {
        elem.style.cssText = "width: 100%; text-align: start; padding: .2vw;";
        const keys = elem.ariaKeyShortcuts.split('+').map((k) => k.replace('Control', 'CTRL').replace('Shift', 'SHIFT').replace('Wheel', 'SCROLL'));
        if (elem.ariaKeyShortcuts.length > 0) {
            const table = document.createElement('table');
            table.style.cssText = 'width: 100%';
            const row = document.createElement('tr');
            table.appendChild(row);
            const menuTextCol = document.createElement('td');
            menuTextCol.innerHTML = elem.innerHTML;
            row.appendChild(menuTextCol);
            const menuShortCutCol = document.createElement('td');
            menuShortCutCol.style.cssText = "text-align: end;";
            menuShortCutCol.innerHTML = keys.map((k) => "<kbd>" + k + "</kbd>").join("+");
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
    document.getElementById('btnModelMediapipe').onclick = () => app.setModel('mediapipe');
    document.getElementById('btnCloseModal').onclick = () => app.setModel('mediapipe');
    document.getElementById('btnCancelModal').onclick = () => app.setModel('mediapipe');
    document.getElementById('btnSaveCustomModel').onclick = () => app.setModel('custom');
    document.getElementById('feat_le').onclick = _ => app.deleteFeature('left_eye');
    document.getElementById('feat_leb').onclick = _ => app.deleteFeature('left_eyebrow');
    document.getElementById('feat_re').onclick = _ => app.deleteFeature('right_eye');
    document.getElementById('feat_reb').onclick = _ => app.deleteFeature('right_eyebrow');
    document.getElementById('feat_n').onclick = _ => app.deleteFeature('nose');
    document.getElementById('feat_m').onclick = _ => app.deleteFeature('mouth');
    window.onresize = () => app.resizeWindow();
    window.onwheel = (e) => {
        if (e.shiftKey) {
            app.addFeatureDrag(e.deltaY / 100);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBcUM7QUFDckMsOENBQXlDO0FBQ3pDLGdEQUEyQztBQUMzQyx5RUFBb0U7QUFDcEUsNkNBQXdDO0FBQ3hDLHlDQUFvQztBQUNwQyx5Q0FBb0M7QUFDcEMsNkVBT3lDO0FBRXpDLGlEQUFpRDtBQUNqRCxtREFBbUQ7QUFFbkQsTUFBYSxHQUFHO0lBY1osWUFBWSxTQUFpQjtRQVRyQixjQUFTLEdBQXFDLEVBQUUsQ0FBQztRQUNqRCxXQUFNLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFFekIsV0FBTSxHQUFHO1lBQ3RCLFdBQVcsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLDBCQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDO1lBQzlELFFBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQztTQUMvQyxDQUFBO1FBQ08saUJBQVksR0FBa0IsSUFBSSxDQUFDO1FBR3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxlQUFNLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtZQUMvQyx3QkFBd0I7WUFDeEIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQXNCLENBQUM7WUFDcEUsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksbUJBQVEsQ0FBQyxrQkFBa0IsRUFBRSxH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