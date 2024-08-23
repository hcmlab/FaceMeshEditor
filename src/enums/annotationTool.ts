export enum AnnotationTool {
  FaceMesh = 'Face Mesh'
}

export const allAnnotationTools: AnnotationTool[] = Object.values(AnnotationTool).filter(
  (value) => typeof value === 'string'
) as AnnotationTool[];
