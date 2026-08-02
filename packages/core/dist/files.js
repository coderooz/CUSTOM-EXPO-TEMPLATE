"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTemplateFiles = copyTemplateFiles;
const fs_1 = require("fs");
const path_1 = require("path");
function copyTemplateFiles(templateDir, targetDir) {
    let count = 0;
    function copyRecursive(source, dest) {
        const entries = (0, fs_1.readdirSync)(source);
        for (const entry of entries) {
            const sourcePath = (0, path_1.join)(source, entry);
            const destPath = (0, path_1.join)(dest, entry);
            const stat = (0, fs_1.statSync)(sourcePath);
            if (stat.isDirectory()) {
                (0, fs_1.mkdirSync)(destPath, { recursive: true });
                copyRecursive(sourcePath, destPath);
            }
            else {
                (0, fs_1.mkdirSync)((0, path_1.dirname)(destPath), { recursive: true });
                (0, fs_1.copyFileSync)(sourcePath, destPath);
                count++;
            }
        }
    }
    if (!isDirectory(templateDir))
        return 0;
    copyRecursive(templateDir, targetDir);
    return count;
}
function isDirectory(path) {
    try {
        return (0, fs_1.statSync)(path).isDirectory();
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=files.js.map