"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor2D = void 0;
const point2d_1 = require("./graph/point2d");
const perspective2d_1 = require("./graph/perspective2d");
const graph_1 = require("./graph/graph");
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const face_landmarks_features_1 = require("./graph/face_landmarks_features");
class Editor2D {
    constructor() {
        this.zoomScale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.prevMouseX = 0;
        this.prevMouseY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDelta = 5; // Constant for the hovering and selection
        this.isMoving = false;
        this.isPanning = false;
        this.image = new Image();
        this.onPointsEditedCallback = null;
        this._dragDepth = 0;
        this._graph = new graph_1.Graph([]);
        this._showTesselation = false;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Size canvas
        this.clearAndFitToWindow();
        // Register event listeners
        this.canvas.addEventListener('mousedown', ev => this.handleMouseDown(ev));
        this.canvas.addEventListener('mousemove', ev => this.handleMouseMove(ev));
        this.canvas.addEventListener('mouseup', ev => this.handleMouseUp(ev));
        this.canvas.addEventListener('wheel', ev => this.handleWheel(ev));
        this.canvas.addEventListener('mouseout', ev => this.handleMouseUp(ev));
    }
    get dragDepth() {
        return this._dragDepth;
    }
    set dragDepth(value) {
        this._dragDepth = value;
    }
    get graph() {
        return this._graph;
    }
    set graph(value) {
        if (value) {
            this._graph = value.clone();
            this.draw();
        }
    }
    get showTesselation() {
        return this._showTesselation;
    }
    set showTesselation(value) {
        this._showTesselation = value;
        this.draw();
    }
    setOnBackgroundLoadedCallback(callback) {
        this.image.onload = _ => callback(this.image);
    }
    setBackgroundSource(source) {
        const reader = new FileReader();
        reader.onload = _ => {
            const result = reader.result;
            if (result) {
                this.image.src = result.toString();
            }
        };
        reader.readAsDataURL(source);
    }
    getBackgroundImage() {
        return this.image;
    }
    setOnPointsEditedCallback(callback) {
        this.onPointsEditedCallback = callback;
    }
    clearAndFitToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    center() {
        const scaleX = this.canvas.width / this.image.width;
        const scaleY = this.canvas.height / this.image.height;
        this.zoomScale = scaleX < scaleY ? scaleX : scaleY;
        this.offsetX = this.canvas.width / 2 - this.image.width / 2 * this.zoomScale;
        this.offsetY = this.canvas.height / 2 - this.image.height / 2 * this.zoomScale;
        // Redraw
        this.draw();
    }
    zoom(out) {
        let dx = (this.mouseX - this.offsetX) / this.zoomScale;
        let dy = (this.mouseY - this.offsetY) / this.zoomScale;
        if (out) {
            this.canvas.style.cursor = "zoom-out";
            this.zoomScale /= 1.1;
        }
        else {
            this.canvas.style.cursor = "zoom-in";
            this.zoomScale *= 1.1;
        }
        // Ensure zoom level is within a reasonable range
        this.zoomScale = Math.min(Math.max(0.1, this.zoomScale), 50);
        // Update offsets
        this.offsetX = this.mouseX - dx * this.zoomScale;
        this.offsetY = this.mouseY - dy * this.zoomScale;
        // Redraw
        this.draw();
    }
    pan(deltaX, deltaY) {
        this.canvas.style.cursor = "move";
        // update offsets
        this.offsetX += deltaX;
        this.offsetY += deltaY;
        // Redraw
        this.draw();
    }
    draw() {
        this.clearAndFitToWindow();
        // Set Transformations
        this.ctx.translate(this.offsetX, this.offsetY);
        this.ctx.scale(this.zoomScale, this.zoomScale);
        // Draw Background
        this.ctx.drawImage(this.image, 0, 0);
        // Draw Mesh
        if (this.showTesselation) {
            this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_TESSELATION, '#737373');
        }
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, '#42ffef');
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LIPS, '#ff0883');
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, '#b3ff42');
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, '#b3ff42');
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, '#efffd8');
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, '#42c6ff');
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, '#42c6ff');
        this.drawFaceTrait(tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, '#b5ebff');
        this.drawFaceTrait(face_landmarks_features_1.FACE_LANDMARKS_NOSE, '#eada70');
    }
    drawPoint(point) {
        if (point && !point.deleted) {
            const projectedPoint = perspective2d_1.Perspective2D.project(this.image, point);
            if (point.hovered) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'rgba(255,250,163,0.6)';
                this.ctx.arc(projectedPoint.x, projectedPoint.y, this.mouseDelta / this.zoomScale, 0, Math.PI * 2);
                // this.ctx.font = 20 / zoomScale + "px serif";
                // this.ctx.fillText(point.getId(), projectedPoint.x, projectedPoint.y);
                this.ctx.fill();
            }
            if (point.selected) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'rgba(255,250,58,0.6)';
                this.ctx.arc(projectedPoint.x, projectedPoint.y, this.mouseDelta / this.zoomScale, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = '#4642ff';
            this.ctx.arc(projectedPoint.x, projectedPoint.y, 2 / this.zoomScale, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    drawFaceTrait(connections, color) {
        if (this.graph) {
            const pointPairs = connections.map(connection => {
                return { start: this.graph.getById(connection.start), end: this.graph.getById(connection.end) };
            });
            // Draw edges
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1 / this.zoomScale;
            for (const connection of pointPairs) {
                let startPoint = connection.start;
                let endPoint = connection.end;
                if (startPoint && endPoint && !startPoint.deleted && !endPoint.deleted) {
                    startPoint = perspective2d_1.Perspective2D.project(this.image, startPoint);
                    endPoint = perspective2d_1.Perspective2D.project(this.image, endPoint);
                    this.ctx.moveTo(startPoint.x, startPoint.y);
                    this.ctx.lineTo(endPoint.x, endPoint.y);
                }
            }
            this.ctx.stroke();
            // Draw points
            for (const connection of pointPairs) {
                let startPoint = connection.start;
                let endPoint = connection.end;
                this.drawPoint(startPoint);
                this.drawPoint(endPoint);
            }
        }
    }
    handleMouseDown(event) {
        // Check if any normalized 3D point is clicked
        if (event.button === 0) {
            // left button
            this._graph.points.filter(p => p.hovered && !p.deleted).forEach(p => {
                p.selected = true;
                this.isMoving = true;
            });
        }
        else if (event.button === 1) {
            // wheel button
            this.isPanning = true;
        }
    }
    handleMouseMove(event) {
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        const relativeMouseX = (this.mouseX - this.offsetX) / this.zoomScale;
        const relativeMouseY = (this.mouseY - this.offsetY) / this.zoomScale;
        if (this.isMoving) {
            this.canvas.style.cursor = "pointer";
            // Update normalized coordinates based on mouse position
            const alreadyUpdated = new Set();
            const relativeMouse = perspective2d_1.Perspective2D.unproject(this.image, new point2d_1.Point2D(-1, relativeMouseX, relativeMouseY, []));
            const selectedPoint = this.graph.getSelected();
            let neighbourPoints = [selectedPoint];
            const deltaX = relativeMouse.x - selectedPoint.x;
            const deltaY = relativeMouse.y - selectedPoint.y;
            for (let depth = 0; depth <= this.dragDepth; depth++) {
                // Go through each depth step
                let tmpPoints = [];
                for (const neigP of neighbourPoints) {
                    const influenceFactor = Math.exp(-depth);
                    const newX = neigP.x + deltaX * influenceFactor;
                    const newY = neigP.y + deltaY * influenceFactor;
                    const newPoint = new point2d_1.Point2D(-1, newX, newY, []);
                    neigP.moveTo(newPoint);
                    alreadyUpdated.add(neigP.id);
                    // extract next depth of neighbours
                    // @ts-ignore
                    tmpPoints = tmpPoints.concat(this.graph.getNeighbourPointsOf(neigP));
                }
                neighbourPoints = tmpPoints.filter(p => !alreadyUpdated.has(p.id));
            }
            // Redraw
            this.draw();
        }
        else if (this.isPanning) {
            this.pan(this.mouseX - this.prevMouseX, this.mouseY - this.prevMouseY);
        }
        else if (this.image) {
            let pointHover = false;
            const relativeMouse = perspective2d_1.Perspective2D.unproject(this.image, new point2d_1.Point2D(-1, relativeMouseX, relativeMouseY, []));
            this._graph.points.forEach(point => {
                if (!pointHover && perspective2d_1.Perspective2D.intersects(this.image, point, relativeMouse, this.mouseDelta / this.zoomScale)) {
                    point.hovered = true;
                    pointHover = true;
                }
                else {
                    pointHover || (pointHover = point.hovered); // Also update if one point gets un-hovered!
                    point.hovered = false;
                }
            });
            if (pointHover) {
                this.draw();
            }
        }
    }
    handleMouseUp(_) {
        if (this.isMoving && this.onPointsEditedCallback) {
            this.onPointsEditedCallback(this._graph);
        }
        this.canvas.style.cursor = "default";
        this.isPanning = false;
        this.isMoving = false;
        this._graph.points.forEach(point => point.selected = false);
    }
    handleWheel(event) {
        if (this.image && !event.shiftKey) {
            this.zoom(event.deltaY > 0);
            event.preventDefault();
        }
    }
}
exports.Editor2D = Editor2D;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yMmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZWRpdG9yMmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXdDO0FBQ3hDLHlEQUFvRDtBQUNwRCx5Q0FBb0M7QUFDcEMsMERBQXVEO0FBQ3ZELDZFQUFnRjtBQUVoRixNQUFhLFFBQVE7SUFnQmpCO1FBYlEsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUMsMENBQTBDO1FBQ2xFLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixVQUFLLEdBQXFCLElBQUksS0FBSyxFQUFFLENBQUM7UUFDdEMsMkJBQXNCLEdBQTZDLElBQUksQ0FBQztRQWV4RSxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBVXZCLFdBQU0sR0FBbUIsSUFBSSxhQUFLLENBQVUsRUFBRSxDQUFDLENBQUM7UUFhaEQscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBbkN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFzQixDQUFDO1FBQ3JFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUE2QixDQUFDO1FBQ3BFLGNBQWM7UUFDZCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENB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