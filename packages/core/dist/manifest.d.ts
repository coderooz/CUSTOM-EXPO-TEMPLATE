import { FeatureManifest } from './types';
export declare function validateManifest(data: unknown): FeatureManifest;
export declare function loadManifest(packagePath: string): FeatureManifest;
export declare function checkConflicts(selected: string[], allManifests: Map<string, FeatureManifest>): string | null;
//# sourceMappingURL=manifest.d.ts.map