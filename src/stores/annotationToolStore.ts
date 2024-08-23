import { defineStore } from 'pinia';
import { AnnotationTool } from '@/enums/annotationTool';

export const useAnnotationToolStore = defineStore({
  id: 'annotationTool',

  state: (): {
    tools: AnnotationTool[];
  } => ({
    tools: [AnnotationTool.FaceMesh]
  }),
  actions: {
    remove(delTool: AnnotationTool) {
      this.tools = this.tools.filter((tool) => tool !== delTool);
    }
  }
});
