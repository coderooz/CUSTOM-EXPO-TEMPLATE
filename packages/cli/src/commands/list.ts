import { listAvailableFeatures, resolveFeaturesDir } from '@coderooz/create-app';
import { loadManifest } from '@coderooz/core';
import { join } from 'path';

export async function listCommand(): Promise<void> {
  const featuresDir = resolveFeaturesDir();
  const features = listAvailableFeatures(featuresDir);

  console.log('\n  Available features:\n');

  if (features.length === 0) {
    console.log('    (no feature packages found)\n');
    return;
  }

  for (const feature of features) {
    try {
      const manifest = loadManifest(join(featuresDir, feature));
      const name = feature.replace(/^feature-/, '');
      console.log(`  ${name}`);
      if (manifest.description) console.log(`    ${manifest.description}`);

      const details: string[] = [];
      if (manifest.provides?.length) details.push(`provides: ${manifest.provides.join(', ')}`);
      if (manifest.requires?.length) details.push(`requires: ${manifest.requires.join(', ')}`);
      if (details.length) console.log(`    ${details.join('  |  ')}`);
      console.log();
    } catch {
      console.log(`  ${feature}\n`);
    }
  }

  console.log('  Usage: coderooz create my-app --with sqlite,camera');
  console.log('         coderooz add notifs\n');
}
