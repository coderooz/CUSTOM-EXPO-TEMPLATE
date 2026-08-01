import { z } from 'zod';
import { FeatureManifest } from './types';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ProviderHookSchema = z.object({
  import: z.string(),
  path: z.string(),
  props: z.record(z.string()).optional(),
});

const NavigationScreenSchema = z.object({
  name: z.string(),
  path: z.string(),
  icon: z.string().optional(),
  options: z.record(z.unknown()).optional(),
});

const NavigationHookSchema = z.object({
  type: z.enum(['add-screens', 'create-group']),
  group: z.string(),
  screens: z.array(NavigationScreenSchema),
});

const ServiceHookSchema = z.object({
  import: z.string(),
  path: z.string(),
  initCall: z.string().optional(),
});

const ConfigMergeSchema = z.object({
  file: z.string(),
  path: z.string(),
  value: z.unknown(),
  type: z.enum(['merge', 'set', 'plugin']),
});

const AssetCopySchema = z.object({
  source: z.string(),
  target: z.string(),
});

const PostInstallHookSchema = z.object({
  command: z.string(),
  cwd: z.string().optional(),
});

const FeatureHooksSchema = z.object({
  providers: z.array(ProviderHookSchema).optional(),
  navigation: z.array(NavigationHookSchema).optional(),
  services: z.array(ServiceHookSchema).optional(),
  env: z.record(z.string()).optional(),
  config: z.array(ConfigMergeSchema).optional(),
  assets: z.array(AssetCopySchema).optional(),
  'app-json': z.array(z.string()).optional(),
  'post-install': z.array(PostInstallHookSchema).optional(),
});

const FeatureManifestSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  description: z.string(),
  hooks: FeatureHooksSchema.optional(),
  dependencies: z.record(z.string()).optional(),
  devDependencies: z.record(z.string()).optional(),
  peerDependencies: z.record(z.string()).optional(),
  conflicts: z.array(z.string()).optional(),
  requires: z.array(z.string()).optional(),
  provides: z.array(z.string()).optional(),
});

export function validateManifest(data: unknown): FeatureManifest {
  return FeatureManifestSchema.parse(data) as FeatureManifest;
}

export function loadManifest(packagePath: string): FeatureManifest {
  const manifestPath = join(packagePath, 'coderooz.json');
  if (!existsSync(manifestPath)) {
    throw new Error(`No coderooz.json found in ${packagePath}`);
  }
  const raw = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  return validateManifest(raw);
}

export function checkConflicts(
  selected: string[],
  allManifests: Map<string, FeatureManifest>,
): string | null {
  for (const name of selected) {
    const manifest = allManifests.get(name);
    if (!manifest?.conflicts) continue;
    for (const conflict of manifest.conflicts) {
      if (selected.includes(conflict)) {
        return `${name} conflicts with ${conflict}`;
      }
    }
  }
  return null;
}
