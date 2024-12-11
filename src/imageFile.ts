/**
 * a wrapper for image files, contains the original file.
 * Also contains the calculated file hash and html data.
 */
import { calculateSHA } from '@/util/sha';
import { imageFromFile } from '@/util/imageFromFile';
import { ThreeDimView } from '@/enums/threeDimView';

export class ImageFile {
  readonly filePointer: File;
  sha: string = '';
  left: string = '';
  center: string = '';
  right: string = '';
  selected: ThreeDimView = ThreeDimView.center;

  private constructor(file: File, sha: string, html: string) {
    this.filePointer = file;
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

  static async create(file: File) {
    const sha = calculateSHA(file).then(
      (sha) => sha,
      (error) => {
        throw new Error("Failed to calculate sha for image: '" + file.name + "': " + error);
      }
    );
    const html = imageFromFile(file).then(
      (html) => html,
      (error) => {
        throw new Error('Failed to parse the image to base64: ' + error);
      }
    );
    return new ImageFile(file, await sha, await html);
  }
}
