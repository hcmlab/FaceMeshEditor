import {FaceLandmarker} from "@mediapipe/tasks-vision";

export class Connection {
    public start: number;
    public end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}

function convertToConnections(...connections: number[][]): Connection[] {
    return connections.map(([start, end]) => new Connection(start, end));
}

export function findNeighbourPointIds(pointId: number, connections: Connection[], depth: number) : number[] {
    if (depth === 0) {
        return Array.from(new Set([pointId]));
    }
    let neighbours = connections
        .filter(conn => conn.start === pointId || conn.end === pointId)
        .map(conn => conn.start === pointId ? conn.end : conn.start);
    let neighbourIds = new Set(neighbours);
    for (let neighbour of neighbours) {
        let subNeighbours = findNeighbourPointIds(neighbour, connections, depth - 1);
        for (let subNeighbour of subNeighbours) {
            neighbourIds.add(subNeighbour);
        }
    }
    return Array.from(neighbourIds);
}

export const FACE_FEATURE_LIPS = Array.from(new Set(
    FaceLandmarker.FACE_LANDMARKS_LIPS.map(con => con.start).concat(
        [62, 76, 184, 183, 42, 74, 41, 73, 38, 72, 12, 11, 268, 302, 271, 303,
            272, 304, 407, 408, 292, 306, 325, 307, 319, 320, 403, 404, 316, 315, 15, 16, 86, 85,
            179, 180, 89, 90, 96, 77, 291, 308])
));

export const FACE_FEATURE_LEFT_EYE = Array.from(new Set(
    FaceLandmarker.FACE_LANDMARKS_LEFT_EYE.map(con => con.start).concat(FaceLandmarker.FACE_LANDMARKS_LEFT_EYE.map(con => con.end)).concat(
        FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS.map(con => con.start).concat(FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS.map(con => con.end)))
));

export const FACE_FEATURE_LEFT_EYEBROW = Array.from(new Set(
    FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW.map(con => con.start).concat(FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW.map(con => con.end))
));

export const FACE_FEATURE_RIGHT_EYE = Array.from(new Set(
    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE.map(con => con.start).concat(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE.map(con => con.end)).concat(
        FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS.map(con => con.start).concat(FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS.map(con => con.end)))
));

export const FACE_FEATURE_RIGHT_EYEBROW = Array.from(new Set(
    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW.map(con => con.start).concat(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW.map(con => con.end))
));

export const FACE_LANDMARKS_NOSE = convertToConnections(
    [2, 97], [97, 98], [98, 64], [64, 48], [48, 115], [115, 220], [220, 45],
    [45, 4], [4, 275], [275, 440], [440, 344], [344, 278], [278, 294], [294, 327], [327, 326], [326, 2], [2, 19],
    [19, 1], [1, 4], [4, 5], [5, 195], [195, 197], [197, 6], [6, 168]
);

export const FACE_FEATURE_NOSE = Array.from(new Set(
    FACE_LANDMARKS_NOSE.map(con => con.start).concat(FACE_LANDMARKS_NOSE.map(con => con.end)).concat(
        [
            102, 49, 209, 217, 174, 196, 6, 419, 399, 437, 429, 279, 331, 198, 131, 134, 236,
            3, 51, 248, 281, 456, 363, 420, 360, 94, 141, 125, 44, 237, 239, 238, 241, 242,
            99, 60, 75, 240, 235, 59, 166, 219, 79, 218, 370, 354, 274, 457, 438, 439, 455,
            460, 328, 462, 461, 250, 458, 290, 305, 289, 392, 309, 459, 20
        ])
));