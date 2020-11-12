import path from 'path';
import { findPathToFile } from '../.';

describe('findPathToFile', () => {
  describe('when file exists', () => {
    it('works properly', async () => {
      const fileNameToFind = 'package.json';
      const result = await findPathToFile(fileNameToFind);

      const expectedPathToFile = require.resolve(`../../${fileNameToFind}`);
      const expected = {
        filePath: expectedPathToFile,
        dirPath: path.dirname(expectedPathToFile),
      }

      expect(result).toEqual(expected);
    });
  });

  describe('when file does not exist', () => {
    it('throws an error', () => {
      const fileNameToFind = 'unknownFile.json';
      const result = findPathToFile(fileNameToFind);

      expect(result).rejects.toThrow('There is no such file');
    });
  });

  describe('when point out a current working directory', () => {
    it('works properly', async () => {
      const fileNameToFind = 'someFile.txt';
      const result = await findPathToFile(fileNameToFind, { cwd: path.resolve('./src/tests/fixtures/someDir/oneMoreDir') });

      const expectedPathToFile = path.resolve('./src/tests/fixtures/someFile.txt');
      const expected = {
        filePath: expectedPathToFile,
        dirPath: path.dirname(expectedPathToFile),
      }

      expect(result).toEqual(expected);
    });
  });
});
