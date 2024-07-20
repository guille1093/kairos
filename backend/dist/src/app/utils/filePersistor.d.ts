/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
export declare const saveFile: (file: Express.Multer.File) => Express.Multer.File;
export declare const saveFiles: (files: Express.Multer.File[] | Express.Multer.File | null | {}) => void;
export declare const deleteFile: (file: Express.Multer.File) => void;
export declare const getPaths: (fileName: string) => string;
