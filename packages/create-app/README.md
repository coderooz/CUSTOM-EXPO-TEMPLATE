# @coderooz/create-app

Scaffolding and feature weaving orchestration for Coderooz Expo projects. Combines `create-expo-app` with the feature package system.

## Usage

```ts
import { scaffoldBase, weaveFeatures } from '@coderooz/create-app';

const projectDir = scaffoldBase({ appName: 'my-app' });
weaveFeatures({
  projectDir,
  features: ['sqlite', 'camera'],
  featuresDir: './packages',
});
```

## API

| Export | Description |
|--------|-------------|
| `scaffoldBase(options)` | Run `npx create-expo-app` with the Coderooz template |
| `weaveFeatures(options)` | Resolve feature names, load manifests, check conflicts, apply all features |
| `listAvailableFeatures(dir)` | Scan a directory for packages with `coderooz.json` |
| `runPostInstall(projectDir)` | Run `npm install` in the target project |
| `printNextSteps(projectDir)` | Print post-scaffold instructions |
| `updateTemplate(options)` | Reconcile an existing project against the base template |
