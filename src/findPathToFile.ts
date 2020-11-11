import path from 'path';
import fs from 'fs';


type FindPathToFile = (fileName: string; options: { cwd?: string }) => Promise<string | Error>
export const findPathToFile: FindPathToFile = async (fileName = '', options) => {
  let pathToFile = path.resolve(options.cwd || '', fileName);

  while(true) {
    const fileStat = await fs.promises.lstat(pathToFile); 

    if (fileStat.isFile()) {
      return pathToFile;
    }

    const pathToDir = path.dirname(pathToFile);
    const dirStat = await fs.promises.lstat(pathToDir);

    if (!dirStat.isDirectory()) {
      return Promise.reject(new Error('There is no such file.'))
    }

    pathToFile = path.resolve('..', pathToFile);
  }  
}
