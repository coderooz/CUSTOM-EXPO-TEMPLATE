export * from './types';
export { validateManifest, loadManifest, checkConflicts } from './manifest';
export { applyConfigUpdates, mergeDependencies, deepMerge } from './merge';
export type { ArrayMergeStrategy } from './merge';
export { copyTemplateFiles } from './files';
export { installFeatureDependencies } from './deps';
export { weaveFeature } from './hooks';
export type { WeaveContext } from './hooks';
export { reconcileTemplate, readTemplateFilesList, VALID_MODES } from './reconcile';
export type { ReconcileOptions, ReconcileResult, FileAction, ReconcileMode } from './reconcile';
//# sourceMappingURL=index.d.ts.map