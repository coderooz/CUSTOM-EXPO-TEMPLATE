"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const files_1 = require("../files");
let sourceDir;
let targetDir;
(0, vitest_1.beforeEach)(() => {
    sourceDir = (0, path_1.join)((0, os_1.tmpdir)(), `coderooz-test-source-${Date.now()}`);
    targetDir = (0, path_1.join)((0, os_1.tmpdir)(), `coderooz-test-target-${Date.now()}`);
    (0, fs_1.mkdirSync)(sourceDir, { recursive: true });
    (0, fs_1.mkdirSync)(targetDir, { recursive: true });
});
(0, vitest_1.afterEach)(() => {
    (0, fs_1.rmSync)(sourceDir, { recursive: true, force: true });
    (0, fs_1.rmSync)(targetDir, { recursive: true, force: true });
});
(0, vitest_1.describe)('copyTemplateFiles', () => {
    (0, vitest_1.it)('copies files from source to target', () => {
        (0, fs_1.writeFileSync)((0, path_1.join)(sourceDir, 'hello.txt'), 'world');
        const count = (0, files_1.copyTemplateFiles)(sourceDir, targetDir);
        (0, vitest_1.expect)(count).toBe(1);
        (0, vitest_1.expect)((0, fs_1.readFileSync)((0, path_1.join)(targetDir, 'hello.txt'), 'utf-8')).toBe('world');
    });
    (0, vitest_1.it)('copies nested directory structure', () => {
        (0, fs_1.mkdirSync)((0, path_1.join)(sourceDir, 'subdir'), { recursive: true });
        (0, fs_1.writeFileSync)((0, path_1.join)(sourceDir, 'subdir', 'nested.txt'), 'nested content');
        const count = (0, files_1.copyTemplateFiles)(sourceDir, targetDir);
        (0, vitest_1.expect)(count).toBe(1);
        (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(targetDir, 'subdir', 'nested.txt'))).toBe(true);
        (0, vitest_1.expect)((0, fs_1.readFileSync)((0, path_1.join)(targetDir, 'subdir', 'nested.txt'), 'utf-8')).toBe('nested content');
    });
    (0, vitest_1.it)('copies multiple files', () => {
        (0, fs_1.writeFileSync)((0, path_1.join)(sourceDir, 'a.txt'), 'a');
        (0, fs_1.writeFileSync)((0, path_1.join)(sourceDir, 'b.txt'), 'b');
        (0, fs_1.writeFileSync)((0, path_1.join)(sourceDir, 'c.txt'), 'c');
        const count = (0, files_1.copyTemplateFiles)(sourceDir, targetDir);
        (0, vitest_1.expect)(count).toBe(3);
    });
    (0, vitest_1.it)('returns 0 for nonexistent source directory', () => {
        const count = (0, files_1.copyTemplateFiles)((0, path_1.join)((0, os_1.tmpdir)(), 'nonexistent-dir-12345'), targetDir);
        (0, vitest_1.expect)(count).toBe(0);
    });
    (0, vitest_1.it)('returns 0 for empty source directory', () => {
        const count = (0, files_1.copyTemplateFiles)(sourceDir, targetDir);
        (0, vitest_1.expect)(count).toBe(0);
    });
    (0, vitest_1.it)('overwrites existing files in target', () => {
        (0, fs_1.writeFileSync)((0, path_1.join)(sourceDir, 'existing.txt'), 'new content');
        (0, fs_1.writeFileSync)((0, path_1.join)(targetDir, 'existing.txt'), 'old content');
        const count = (0, files_1.copyTemplateFiles)(sourceDir, targetDir);
        (0, vitest_1.expect)(count).toBe(1);
        (0, vitest_1.expect)((0, fs_1.readFileSync)((0, path_1.join)(targetDir, 'existing.txt'), 'utf-8')).toBe('new content');
    });
});
//# sourceMappingURL=files.test.js.map