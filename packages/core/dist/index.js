"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_MODES = exports.readTemplateFilesList = exports.reconcileTemplate = exports.weaveFeature = exports.installFeatureDependencies = exports.copyTemplateFiles = exports.deepMerge = exports.mergeDependencies = exports.applyConfigUpdates = exports.checkConflicts = exports.loadManifest = exports.validateManifest = void 0;
__exportStar(require("./types"), exports);
var manifest_1 = require("./manifest");
Object.defineProperty(exports, "validateManifest", { enumerable: true, get: function () { return manifest_1.validateManifest; } });
Object.defineProperty(exports, "loadManifest", { enumerable: true, get: function () { return manifest_1.loadManifest; } });
Object.defineProperty(exports, "checkConflicts", { enumerable: true, get: function () { return manifest_1.checkConflicts; } });
var merge_1 = require("./merge");
Object.defineProperty(exports, "applyConfigUpdates", { enumerable: true, get: function () { return merge_1.applyConfigUpdates; } });
Object.defineProperty(exports, "mergeDependencies", { enumerable: true, get: function () { return merge_1.mergeDependencies; } });
Object.defineProperty(exports, "deepMerge", { enumerable: true, get: function () { return merge_1.deepMerge; } });
var files_1 = require("./files");
Object.defineProperty(exports, "copyTemplateFiles", { enumerable: true, get: function () { return files_1.copyTemplateFiles; } });
var deps_1 = require("./deps");
Object.defineProperty(exports, "installFeatureDependencies", { enumerable: true, get: function () { return deps_1.installFeatureDependencies; } });
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "weaveFeature", { enumerable: true, get: function () { return hooks_1.weaveFeature; } });
var reconcile_1 = require("./reconcile");
Object.defineProperty(exports, "reconcileTemplate", { enumerable: true, get: function () { return reconcile_1.reconcileTemplate; } });
Object.defineProperty(exports, "readTemplateFilesList", { enumerable: true, get: function () { return reconcile_1.readTemplateFilesList; } });
Object.defineProperty(exports, "VALID_MODES", { enumerable: true, get: function () { return reconcile_1.VALID_MODES; } });
//# sourceMappingURL=index.js.map