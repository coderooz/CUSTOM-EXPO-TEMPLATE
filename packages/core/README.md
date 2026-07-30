# @coderooz/core

Shared core library for the Coderooz feature system. Provides types, manifest validation, config merging, file copying, dependency management, and the hooks execution engine.

## Usage

```ts
import { loadManifest, checkConflicts, weaveFeature } from '@coderooz/core';

const manifest = loadManifest('./packages/feature-sqlite');
const result = weaveFeature(manifest, { projectDir: './my-app', featuresDir: './packages' });
```

## API

| Export | Description |
|--------|-------------|
| `validateManifest(data)` | Validate a feature manifest against the Zod schema |
| `loadManifest(path)` | Load and validate `coderooz.json` from a directory |
| `checkConflicts(selected, manifests)` | Check for conflicts between selected features |
| `weaveFeature(manifest, context)` | Apply a feature: copy templates, install deps, run hooks |
| `copyTemplateFiles(source, target)` | Recursive directory copy (template → project) |
| `applyConfigUpdates(projectDir, updates)` | Apply config merges/sets/plugins to app.json |
| `mergeDependencies(existing, incoming)` | Merge dependency objects with conflict warnings |
| `installFeatureDependencies(projectDir, deps, devDeps)` | Write dependencies to package.json |
| `reconcileTemplate(options)` | Compare template files against a project and add/replace/merge as needed |
| `readTemplateFilesList(packageJsonPath)` | Read the `files` list from a `package.json` for template reconciliation |
