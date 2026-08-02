"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplate = updateTemplate;
const core_1 = require("@coderooz/core");
const path_1 = require("path");
const fs_1 = require("fs");
const templateResolver_1 = require("./templateResolver");
const DEFAULT_SKIP_PATHS = [
    'node_modules',
    '.git',
    'package-lock.json',
    'packages',
    '.expo',
];
function updateTemplate(options) {
    const { projectDir, mode, skipPaths = DEFAULT_SKIP_PATHS } = options;
    const templateDir = (0, templateResolver_1.resolveTemplateDir)(options.templateDir);
    const pkgPath = (0, path_1.join)(templateDir, 'package.json');
    if (!(0, fs_1.existsSync)(templateDir)) {
        throw new Error(`Template directory not found: ${templateDir}`);
    }
    const templateFiles = (0, core_1.readTemplateFilesList)(pkgPath);
    if (templateFiles.length === 0) {
        throw new Error(`No template files listed in ${pkgPath}. Check the "files" field.`);
    }
    const result = (0, core_1.reconcileTemplate)({
        templateDir,
        projectDir,
        mode,
        templateFiles,
        skipPaths,
    });
    const summary = [
        `\n  Template ${mode}:`,
        `    added: ${result.added}`,
        `    replaced: ${result.replaced}`,
        `    merged: ${result.merged}`,
        `    skipped: ${result.skipped}`,
        `    unchanged: ${result.unchanged}`,
        ...(result.failed > 0 ? [`    failed: ${result.failed}`] : []),
        '',
    ].join('\n');
    console.log(summary);
    return result;
}
//# sourceMappingURL=update.js.map