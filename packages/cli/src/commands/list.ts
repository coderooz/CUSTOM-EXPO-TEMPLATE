import { listAvailableFeatures, resolveFeaturesDir } from '@coderooz/create-app';
import { join } from 'path';
import { readFileSync } from 'fs';

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
      const manifest = JSON.parse(
        readFileSync(
          join(featuresDir, feature, 'coderooz.json'),
          'utf-8',
        ),
      );
      console.log(`  ${feature}`);
      console.log(`    ${manifest.description ?? ''}`);
      console.log();
    } catch {
      console.log(`  ${feature}\n`);
    }
  }
}
