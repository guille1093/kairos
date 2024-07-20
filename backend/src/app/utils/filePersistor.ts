import { copyFileSync, unlinkSync } from 'fs';

export const saveFile = (file: Express.Multer.File) => {
  // const fileExt = file?.mimetype?.split('/')[1];
  // extraer la extension del archivo del nombre original
  const originalName = file.originalname.split('.');
  const fileExt = originalName.at(-1);
  const fileGen = `${Date.now()}_${file.filename}.${fileExt}`;
  file.filename = fileGen;
  copyFileSync(file.path, `./files/${fileGen}`);
  unlinkSync(file.path);
  return file;
};

export const saveFiles = (files: Express.Multer.File[] | Express.Multer.File | null | {}) => {
  if (files) {
    Object.values(files).forEach((fileOrFiles) => {
      if (Array.isArray(fileOrFiles)) {
        fileOrFiles.forEach((file) => saveFile(file));
      } else if (fileOrFiles) {
        saveFile(fileOrFiles);
      }
    });
  }
};

export const deleteFile = (file: Express.Multer.File) => {
  unlinkSync(`../files/${file.filename}`);
};

export const getPaths = (fileName: string) => {
  return `../files/${fileName}`;
};
