export enum AnnotationTool {
  BackgroundDrawer = 'BackgroundDrawer',
  FaceMesh = 'Face Mesh',
  HandLandmark = 'Hand Landmark'
}

export const allAnnotationTools: AnnotationTool[] = Object.values(
  AnnotationTool
) as AnnotationTool[];

allAnnotationTools.shift();
