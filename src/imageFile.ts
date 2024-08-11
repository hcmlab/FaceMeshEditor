/**
 * a wrapper for image files, contains the original file.
 * Also contains the calculated file hash and html data.
 */
import { calculateSHA } from '@/util/sha';
import { imageFromFile } from '@/util/imageFromFile';

export class ImageFile {
  readonly file: File;
  sha: string = '';
  html: string = '';

  static async create(file: File) {
    const sha = await calculateSHA(file);
    const html = await imageFromFile(file);
    return new ImageFile(file, sha, html);
  }

  private constructor(file: File, sha: string, html: string) {
    this.file = file;
    this.sha = sha;
    this.html = html;
  }
}
