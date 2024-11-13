/**
 * a wrapper for image files, contains the original file.
 * Also contains the calculated file hash and html data.
 */
import { calculateSHA } from '@/util/sha';
import { imageFromFile } from '@/util/imageFromFile';
import { ThreeDimView } from '@/enums/threeDimView';

export class ImageFile {
  readonly file: File;
  sha: string = '';
  left: string = '';
  center: string = '';
  right: string = '';
  selected: ThreeDimView = ThreeDimView.center;

  static async create(file: File) {
    const sha = await calculateSHA(file);
    const html = await imageFromFile(file);
    return new ImageFile(file, sha, html);
  }

  private constructor(file: File, sha: string, html: string) {
    this.file = file;
    this.sha = sha;
    this.center = html;
  }

  get html(): string {
    switch (this.selected) {
      case ThreeDimView.left:
        return this.left;
      case ThreeDimView.center:
        return this.center;
      case ThreeDimView.right:
        return this.right;
      default:
        return this.center;
    }
  }
}
