"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaths = exports.deleteFile = exports.saveFiles = exports.saveFile = void 0;
const fs_1 = require("fs");
const saveFile = (file) => {
    const originalName = file.originalname.split('.');
    const fileExt = originalName.at(-1);
    const fileGen = `${Date.now()}_${file.filename}.${fileExt}`;
    file.filename = fileGen;
    (0, fs_1.copyFileSync)(file.path, `./files/${fileGen}`);
    (0, fs_1.unlinkSync)(file.path);
    return file;
};
exports.saveFile = saveFile;
const saveFiles = (files) => {
    if (files) {
        Object.values(files).forEach((fileOrFiles) => {
            if (Array.isArray(fileOrFiles)) {
                fileOrFiles.forEach((file) => (0, exports.saveFile)(file));
            }
            else if (fileOrFiles) {
                (0, exports.saveFile)(fileOrFiles);
            }
        });
    }
};
exports.saveFiles = saveFiles;
const deleteFile = (file) => {
    (0, fs_1.unlinkSync)(`../files/${file.filename}`);
};
exports.deleteFile = deleteFile;
const getPaths = (fileName) => {
    return `../files/${fileName}`;
};
exports.getPaths = getPaths;
//# sourceMappingURL=filePersistor.js.map