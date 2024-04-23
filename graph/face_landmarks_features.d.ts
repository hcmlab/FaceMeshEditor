/**
 * Represents a connection between two points.
 */
export declare class Connection {
    /**
     * Creates a new Connection instance.
     * @param {number} start - The ID of the starting point.
     * @param {number} end - The ID of the ending point.
     */
    constructor(start: number, end: number);
    /**
     * The ID of the starting point.
     */
    start: number;
    /**
     * The ID of the ending point.
     */
    end: number;
}
/**
 * Finds neighboring point IDs recursively up to a specified depth.
 * @param {number} pointId - The ID of the starting point.
 * @param {Connection[]} connections - An array of connections.
 * @param {number} depth - The depth of neighbor search.
 * @returns {number[]} - An array of unique neighboring point IDs.
 */
export declare function findNeighbourPointIds(pointId: number, connections: Connection[], depth: number): number[];
/**
 * Array of unique face feature point IDs related to lips.
 */
export declare const FACE_FEATURE_LIPS: number[];
/**
 * Array of unique face feature point IDs related to the left eye.
 */
export declare const FACE_FEATURE_LEFT_EYE: number[];
/**
 * Array of unique face feature point IDs related to the left eyebrow.
 */
export declare const FACE_FEATURE_LEFT_EYEBROW: number[];
/**
 * Array of unique face feature point IDs related to the right eye.
 */
export declare const FACE_FEATURE_RIGHT_EYE: number[];
/**
 * Array of unique face feature point IDs related to the right eyebrow.
 */
export declare const FACE_FEATURE_RIGHT_EYEBROW: number[];
/**
 * Array of unique face landmark point IDs related to the nose.
 */
export declare const FACE_LANDMARKS_NOSE: Connection[];
/**
 * Array of unique face feature point IDs related to the nose.
 */
export declare const FACE_FEATURE_NOSE: number[];
