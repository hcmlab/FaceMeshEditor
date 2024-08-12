import { describe, it, expect } from 'vitest';
import { WebServiceModel } from '../webservice';
import { urlError } from '../../enums/urlError';

describe('WebServiceModel class', () => {
  describe('detect function', () => {
    it('should return a Graph instance when a valid imageFile is given', async () => {
      // Your test code here
    });

    it('should return an Error when an invalid imageFile is given', async () => {
      // Your test code here
    });
  });

  describe('uploadAnnotations function', () => {
    it('should return a Response when valid annotationsJson is given', async () => {
      // Your test code here
    });

    it('should return an Error when invalid annotationsJson is given', async () => {
      // Your test code here
    });
  });

  describe('verifyUrl function', () => {
    it('should return null when a valid URL is given', async () => {
      const goodUrl = 'https://www.example.com';
      const res = await WebServiceModel.verifyUrl(goodUrl);
      expect(res).toBeNull();
    });

    it('should return urlError.InvalidUrl when an invalid URL is given', async () => {
      const badUrl = 'someBadUrl';
      const res = await WebServiceModel.verifyUrl(badUrl);
      expect(res).toBe(urlError.InvalidUrl);
    });

    it('should return urlError.Unreachable when a URL is not reachable', async () => {
      const unreachableUrl = 'https://unbekannt.rz.uni-augsburg.de';
      const res = await WebServiceModel.verifyUrl(unreachableUrl);
      expect(res).toBe(urlError.Unreachable);
    });
  });
});
