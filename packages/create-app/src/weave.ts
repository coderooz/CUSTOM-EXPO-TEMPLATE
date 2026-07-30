import { loadManifest, checkConflicts, weaveFeature, FeatureManifest } from '@coderooz/core';
import { join } from 'path';
import { existsSync, readdirSync, statSync } from 'fs';

export interface WeaveOptions {
  projectDir: string;
  features: string[];
  featuresDir: string;
}

export function weaveFeatures(options: WeaveOptions): void {
  const { projectDir, features, featuresDir } = options;

  if (!existsSync(featuresDir)) {
    throw new Error(`Features directory not found: ${featuresDir}`);
  }

  const allPackages = readdirSync(featuresDir).filter((entry) => {
    const entryPath = join(featuresDir, entry);
    return statSync(entryPath).isDirectory() && existsSync(join(entryPath, 'coderooz.json'));
  });

  function resolveFeature(name: string): string {
    const exact = join(featuresDir, name);
    if (existsSync(exact) && statSync(exact).isDirectory()) return name;

    const prefixed = `feature-${name}`;
    if (allPackages.includes(prefixed)) return prefixed;

    const match = allPackages.find((p) => p.includes(name));
    if (match) return match;

    throw new Error(`Feature "${name}" not found in ${featuresDir}`);
  }

  const manifests = new Map<string, FeatureManifest>();
  const resolvedNames: string[] = [];

  for (const featureName of features) {
    const resolved = resolveFeature(featureName);
    const featurePath = join(featuresDir, resolved);
    const manifest = loadManifest(featurePath);
    manifests.set(resolved, manifest);
    resolvedNames.push(resolved);
  }

  const conflictError = checkConflicts(resolvedNames, manifests);
  if (conflictError) {
    throw new Error(`Feature conflict: ${conflictError}`);
  }

  const context = { projectDir, featuresDir };

  for (const resolved of resolvedNames) {
    const manifest = manifests.get(resolved)!;
    const result = weaveFeature(manifest, context);

    console.log(`\n  ✓ ${result.feature}: ${result.filesCopied} files copied, ${result.depsAdded} deps added`);

    if (result.hooksExecuted.length > 0) {
      console.log(`    hooks: ${result.hooksExecuted.join(', ')}`);
    }
  }
}

export function listAvailableFeatures(featuresDir: string): string[] {
  if (!existsSync(featuresDir)) return [];

  return readdirSync(featuresDir).filter((entry) => {
    const entryPath = join(featuresDir, entry);
    return statSync(entryPath).isDirectory() && existsSync(join(entryPath, 'coderooz.json'));
  });
}
