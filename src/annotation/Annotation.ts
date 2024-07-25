export interface Annotation {
  loadJson(input: string): void;

  saveJson(): string;
}