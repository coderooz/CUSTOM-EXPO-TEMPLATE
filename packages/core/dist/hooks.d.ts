import { FeatureManifest, WeaveResult } from './types';
export interface WeaveContext {
    projectDir: string;
    featuresDir: string;
}
export declare function weaveFeature(manifest: FeatureManifest, context: WeaveContext): WeaveResult;
//# sourceMappingURL=hooks.d.ts.map