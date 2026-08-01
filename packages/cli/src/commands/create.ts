import { scaffoldBase, weaveFeatures, runPostInstall, printNextSteps, resolveFeaturesDir, listAvailableFeatures } from '@coderooz/create-app';

export interface CreateOptions {
  appName: string;
  with?: string;
  template?: string;
}

const APP_NAME_REGEX = /^[a-z0-9][a-z0-9._-]*$/i;

function validateAppName(appName: string): string {
  if (!appName || !appName.trim()) {
    throw new Error('App name is required. Example: coderooz create my-app');
  }
  if (appName.length > 214) {
    throw new Error(`App name "${appName}" is too long (max 214 characters).`);
  }
  if (!APP_NAME_REGEX.test(appName)) {
    throw new Error(
      `App name "${appName}" is invalid. Use only letters, numbers, dots, underscores, and hyphens.`,
    );
  }
  return appName.trim();
}

export async function createCommand(options: CreateOptions): Promise<void> {
  const appName = validateAppName(options.appName);
  const { template } = options;

  const features: string[] = options.with
    ? options.with.split(',').map((f) => f.trim()).filter(Boolean)
    : [];

  if (features.length > 0) {
    const featuresDir = resolveFeaturesDir();
    const available = listAvailableFeatures(featuresDir);
    const missing = features.filter((f) => {
      const prefixed = `feature-${f}`;
      return !available.includes(f) && !available.includes(prefixed);
    });

    if (missing.length > 0) {
      throw new Error(
        `Unknown feature(s): ${missing.join(', ')}\n` +
          `  Available: ${available.map((f) => f.replace(/^feature-/, '')).join(', ')}`,
      );
    }
  }

  const projectDir = scaffoldBase({
    appName,
    template,
  });

  if (features.length > 0) {
    const featuresDir = resolveFeaturesDir();

    console.log(`\n  Applying features: ${features.join(', ')}\n`);

    weaveFeatures({
      projectDir,
      features,
      featuresDir,
    });
  }

  runPostInstall(projectDir);
  printNextSteps(projectDir);
}
