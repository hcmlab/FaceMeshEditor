import type { orientationGuessResult } from '@/util/orientationGuesser';
import { ThreeDimView } from '@/enums/threeDimView';

export interface MultipleViewImage {
  left: orientationGuessResult | null;
  center: orientationGuessResult | null;
  right: orientationGuessResult | null;
  selected: ThreeDimView;
}
