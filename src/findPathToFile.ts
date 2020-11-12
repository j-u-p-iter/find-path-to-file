import fs from "fs";
import path from "path";

type FindPathToFile = (
  fileName: string,
  options?: { cwd?: string }
) => Promise<{ filePath: string; dirPath: string } | Error>;
export const findPathToFile: FindPathToFile = async (
  fileName,
  options = {}
) => {
  const initialDirectoryPath = options.cwd || "";

  let pathToFile = path.resolve(initialDirectoryPath, fileName);

  while (true) {
    if (fs.existsSync(pathToFile)) {
      return {
        filePath: pathToFile,
        dirPath: path.dirname(pathToFile)
      };
    }

    const pathToDir = path.dirname(pathToFile);
    if (pathToDir === "/") {
      return Promise.reject(new Error("There is no such file."));
    }

    pathToFile = path.resolve(pathToFile, "../..", fileName);
  }
};
