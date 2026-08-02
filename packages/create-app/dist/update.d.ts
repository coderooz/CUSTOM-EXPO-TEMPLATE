import { ReconcileMode, ReconcileResult } from '@coderooz/core';
export interface UpdateOptions {
    projectDir: string;
    mode: ReconcileMode;
    templateDir?: string;
    skipPaths?: string[];
}
export declare function updateTemplate(options: UpdateOptions): ReconcileResult;
//# sourceMappingURL=update.d.ts.map