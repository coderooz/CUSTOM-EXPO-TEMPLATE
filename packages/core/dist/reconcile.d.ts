export type ReconcileMode = 'add-missing' | 'replace' | 'update';
export declare const VALID_MODES: ReconcileMode[];
export interface ReconcileOptions {
    templateDir: string;
    projectDir: string;
    mode: ReconcileMode;
    templateFiles: string[];
    skipPaths?: string[];
    backupDir?: string;
}
export interface FileAction {
    file: string;
    action: 'added' | 'replaced' | 'merged' | 'skipped' | 'unchanged' | 'failed';
    error?: string;
}
export interface ReconcileResult {
    actions: FileAction[];
    added: number;
    replaced: number;
    merged: number;
    skipped: number;
    unchanged: number;
    failed: number;
}
export declare function readTemplateFilesList(packageJsonPath: string): string[];
export declare function reconcileTemplate(options: ReconcileOptions): ReconcileResult;
//# sourceMappingURL=reconcile.d.ts.map