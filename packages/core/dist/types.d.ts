export type HookType = 'providers' | 'navigation' | 'services' | 'env' | 'config' | 'assets' | 'app-json' | 'post-install';
export interface ProviderHook {
    import: string;
    path: string;
    props?: Record<string, string>;
}
export interface NavigationScreen {
    name: string;
    path: string;
    icon?: string;
    options?: Record<string, unknown>;
}
export interface NavigationHook {
    type: 'add-screens' | 'create-group';
    group: string;
    screens: NavigationScreen[];
}
export interface ServiceHook {
    import: string;
    path: string;
    initCall?: string;
}
export interface ConfigMerge {
    file: string;
    path: string;
    value: unknown;
    type: 'merge' | 'set' | 'plugin';
}
export interface AssetCopy {
    source: string;
    target: string;
}
export interface PostInstallHook {
    command: string;
    cwd?: string;
}
export interface FeatureHooks {
    providers?: ProviderHook[];
    navigation?: NavigationHook[];
    services?: ServiceHook[];
    env?: Record<string, string>;
    config?: ConfigMerge[];
    assets?: AssetCopy[];
    'app-json'?: string[];
    'post-install'?: PostInstallHook[];
}
export interface FeatureManifest {
    name: string;
    version: string;
    description: string;
    hooks?: FeatureHooks;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    conflicts?: string[];
    requires?: string[];
    provides?: string[];
}
export interface WeaveResult {
    feature: string;
    filesCopied: number;
    depsAdded: number;
    hooksExecuted: string[];
}
//# sourceMappingURL=types.d.ts.map