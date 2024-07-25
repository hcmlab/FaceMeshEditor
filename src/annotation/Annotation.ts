export enum AnnotationType {
  GRAPH,
  TEXT,
  SEQUENCE,
  VIDEO
}

export interface Annotation {
  type(): AnnotationType;

  clone(): Annotation;

  loadJson(input: string): void;

  toJson(): string;
}