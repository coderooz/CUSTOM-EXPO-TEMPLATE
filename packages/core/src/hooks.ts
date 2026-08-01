import { FeatureManifest, WeaveResult } from './types';
import { copyTemplateFiles } from './files';
import { applyConfigUpdates } from './merge';
import { installFeatureDependencies } from './deps';
import { statSync } from 'fs';
import { join } from 'path';

export interface WeaveContext {
  projectDir: string;
  featuresDir: string;
}

export function weaveFeature(
  manifest: FeatureManifest,
  context: WeaveContext,
): WeaveResult {
  const result: WeaveResult = {
    feature: manifest.name,
    filesCopied: 0,
    depsAdded: 0,
    hooksExecuted: [],
  };

  const featureDir = resolveFeatureDir(context.featuresDir, manifest.name);

  const depsResult = installFeatureDependencies(
    context.projectDir,
    manifest.dependencies ?? {},
    manifest.devDependencies ?? {},
  );
  result.depsAdded = depsResult.depsAdded + depsResult.devDepsAdded;

  if (manifest.hooks?.env) {
    appendEnvFile(context.projectDir, manifest.hooks.env);
    result.hooksExecuted.push('env');
  }

  if (manifest.hooks?.config) {
    applyConfigUpdates(context.projectDir, manifest.hooks.config);
    result.hooksExecuted.push('config');
  }

  const templateDir = join(featureDir, 'template');
  result.filesCopied = copyTemplateFiles(templateDir, context.projectDir);

  if (manifest.hooks?.['app-json']) {
    applyAppJsonPlugins(context.projectDir, manifest.hooks['app-json']);
    result.hooksExecuted.push('app-json');
  }

  if (manifest.hooks?.providers || manifest.hooks?.navigation) {
    result.hooksExecuted.push('providers', 'navigation');

    generateRegistrationCode(
      context.projectDir,
      manifest.hooks?.providers ?? [],
      manifest.hooks?.navigation ?? [],
    );
  }

  return result;
}

function resolveFeatureDir(featuresDir: string, name: string): string {
  const bare = join(featuresDir, name);
  if (isDirectory(bare)) return bare;

  const prefixed = join(featuresDir, `feature-${name}`);
  if (isDirectory(prefixed)) return prefixed;

  return bare;
}

function isDirectory(dir: string): boolean {
  try {
    return statSync(dir).isDirectory();
  } catch {
    return false;
  }
}

function appendEnvFile(projectDir: string, envVars: Record<string, string>): void {
  const envPath = join(projectDir, '.env.example');
  let content = '';
  try {
    content = require('fs').readFileSync(envPath, 'utf-8');
  } catch {
    content = '# Environment Variables\n';
  }

  content += `\n# ${Object.keys(envVars)[0]?.split('_')[0] ?? 'Feature'}\n`;
  for (const [key, value] of Object.entries(envVars)) {
    if (!content.includes(key)) {
      content += `${key}=${value}\n`;
    }
  }
  require('fs').writeFileSync(envPath, content);
}

function applyAppJsonPlugins(projectDir: string, plugins: string[]): void {
  const appJsonPath = join(projectDir, 'app.json');
  const appJson = JSON.parse(require('fs').readFileSync(appJsonPath, 'utf-8'));

  if (!appJson.expo) appJson.expo = {};
  if (!appJson.expo.plugins) appJson.expo.plugins = [];

  for (const plugin of plugins) {
    const existing = appJson.expo.plugins.find(
      (p: string | [string, unknown]) =>
        typeof p === 'string' ? p === plugin : p[0] === plugin,
    );
    if (!existing) {
      appJson.expo.plugins.push(plugin);
    }
  }

  require('fs').writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
}

function generateRegistrationCode(
  projectDir: string,
  providers: { import: string; path: string; props?: Record<string, string> }[],
  _navigation: { type: string; group: string; screens: { name: string; path: string }[] }[],
): void {
  const appPath = join(projectDir, 'App.tsx');
  if (!require('fs').existsSync(appPath)) return;

  let appContent = require('fs').readFileSync(appPath, 'utf-8');

  for (const provider of providers) {
    const importLine = `import ${provider.import} from '${provider.path}';`;
    if (!appContent.includes(importLine)) {
      appContent = importLine + '\n' + appContent;
    }

    const wrapPattern = /(export default function App\(\)[\s\S]*?{[\s\S]*?return\s*\()/;
    const match = appContent.match(wrapPattern);
    if (match) {
      const props = provider.props
        ? Object.entries(provider.props)
            .map(([k, v]) => `${k}={${v}}`)
            .join(' ')
        : '';
      const wrapStart = `<${provider.import}${props ? ' ' + props : ''}>`;
      const wrapEnd = `</${provider.import}>`;

      const replaced = appContent.replace(
        match[0],
        match[0].replace(/return\s*\(/, `return (\n      ${wrapStart}`),
      );

      if (replaced !== appContent) {
        appContent = replaced.replace(/(\);\s*}$)/, `      ${wrapEnd}\n$1`);
      }
    }
  }

  require('fs').writeFileSync(appPath, appContent);
}
