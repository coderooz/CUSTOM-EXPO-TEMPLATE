import { ConfigMerge } from './types';
export type ArrayMergeStrategy = 'replace' | 'concat' | 'unique';
export declare function deepMerge(target: unknown, source: unknown, arrayStrategy?: ArrayMergeStrategy, visited?: WeakSet<object>): unknown;
export declare function applyConfigUpdates(projectDir: string, updates: ConfigMerge[], arrayStrategy?: ArrayMergeStrategy): void;
export declare function mergeDependencies(existing: Record<string, string>, incoming: Record<string, string>): Record<string, string>;
//# sourceMappingURL=merge.d.ts.map