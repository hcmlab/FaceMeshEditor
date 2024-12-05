import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import type { AnnotationData, ModelApi } from './modelApi';
import { Point2D } from '@/graph/point2d';
import { ModelType } from '@/enums/modelType';
import { urlError } from '@/enums/urlError';
import type { ImageFile } from '@/imageFile';
import { FileAnnotationHistory, type GraphData } from '@/cache/fileAnnotationHistory';

/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class WebServiceModel implements ModelApi<Point2D> {
  private readonly url: string;

  /**
   * Creates a new WebServiceModel instance.
   */
  constructor(url: string) {
    this.url = url;
  }

  async detect(imageFile: ImageFile): Promise<FileAnnotationHistory<Point2D> | null> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile.filePointer);

    return getFingerprint().then(async (fingerprint) => {
      const request: RequestInfo = new Request(this.url + '/detect?__id__=' + fingerprint, {
        method: 'POST',
        body: formData
      });
      return fetch(request)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error((await res.json())['message']);
          }
          return res.json();
        })
        .then((json: GraphData) =>
          FileAnnotationHistory.fromJson(json, imageFile, (id) => new Point2D(id, 0, 0, []))
        )
        .catch((err: Error) => {
          console.error(err.message);
          return null;
        });
    });
  }

  async uploadAnnotations(annotations: AnnotationData): Promise<Response> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return getFingerprint().then(async (fingerprint) => {
      annotations = {
        __id__: fingerprint,
        ...annotations
      };
      const request: RequestInfo = new Request(this.url + '/annotations', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(annotations)
      });

      return fetch(request);
    });
  }

  /**
   * Verifies if a given URL is valid. Tries to connect to the endpoint.
   *
   * @param {string} url The URL to verify.
   *
   * @returns {urlError} Returns the type of URL error, if any.
   */
  static async verifyUrl(url: string): Promise<urlError | null> {
    if (!url.endsWith('/')) {
      url = url += '/';
    }
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator

    if (!pattern.test(url)) {
      return urlError.InvalidUrl;
    }

    // try connecting to the url
    const request: RequestInfo = new Request(url, {
      method: 'POST'
    });

    return fetch(request)
      .then((_) => {
        return null;
      })
      .catch((error) => {
        // Log the error message (optional)
        console.error('Network or other error:', error.message);
        // Return urlError.Unreachable for network errors or other exceptions
        return urlError.Unreachable;
      });
  }

  type(): ModelType {
    return ModelType.custom;
  }
}
