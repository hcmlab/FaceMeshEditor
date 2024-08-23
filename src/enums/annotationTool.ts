export enum AnnotationTool {
  BackgroundDrawer = 'BackgroundDrawer',
  FaceMesh = 'Face Mesh'
}

export const allAnnotationTools: AnnotationTool[] = Object.values(
  AnnotationTool
) as AnnotationTool[];
