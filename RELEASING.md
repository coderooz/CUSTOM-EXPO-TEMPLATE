# Releasing

## Prerequisites

- All 7 packages must pass `npm run build`, `npm test`, `npm run lint`, `npm run typecheck`
- CI workflow must pass on the target commit
- You must be logged in to npm: `npm whoami`

## Publish Order

Packages must be published in dependency order:

```
1. @coderooz/core           (no internal deps)
2. expo-template-coderooz   (depends on nothing published — template package)
3. @coderooz/create-app     (depends on @coderooz/core + expo-template-coderooz)
4. @coderooz/cli            (depends on @coderooz/core + @coderooz/create-app)
```

Feature packages (`@coderooz/feature-*`) are for local consumption and are NOT published to npm.

## Version Bump Process

All packages share the same version. When bumping:

1. Update root `package.json` version
2. Update all 6 `packages/*/package.json` versions to match
3. Update version references in dependencies:
   - `@coderooz/core` → used by `create-app` and `cli`
   - `@coderooz/create-app` → used by `cli`
4. Update the CLI version in `packages/cli/src/index.ts`:
   ```
   program.version('X.X.X');
   ```
5. Run `npm run build` to rebuild all packages with the new version

## Changelog Process

1. `CHANGELOG.md` — track all significant changes
2. Each release gets a `## [X.X.X]` section with:
   - ### Added (new features)
   - ### Changed (modifications)
   - ### Fixed (bug fixes)
   - ### Removed (deprecations)
3. Keep the changelog header updated with the latest version

## Publishing Steps

```bash
# 1. Verify everything is clean
npm run build
npm test
npm run lint
npm run typecheck

# 2. Pack and inspect each package
npm pack --ignore-scripts -w packages/core
npm pack --ignore-scripts -w packages/cli
npm pack --ignore-scripts -w packages/create-app
npm pack --ignore-scripts

# 3. Publish in order
npm publish -w packages/core
npm publish                # expo-template-coderooz
npm publish -w packages/create-app
npm publish -w packages/cli
```

## Tagging

After publishing:

```bash
git tag v$(node -p "require('./package.json').version")
git push origin v$(node -p "require('./package.json').version")
```

## Rollback Procedure

If a broken package is published:

1. **Deprecate** (do not unpublish — npm discourages it):
   ```bash
   npm deprecate @coderooz/core@"<X.X.X" "Broken: <reason>. Use X.X.X instead"
   ```
2. **Fix** the issue in a new commit
3. **Bump version** and publish a patch release
4. **Update** CHANGELOG with the fix

## Package URLs

| Package | npm URL |
|---------|---------|
| `expo-template-coderooz` | https://www.npmjs.com/package/expo-template-coderooz |
| `@coderooz/core` | https://www.npmjs.com/package/@coderooz/core |
| `@coderooz/create-app` | https://www.npmjs.com/package/@coderooz/create-app |
| `@coderooz/cli` | https://www.npmjs.com/package/@coderooz/cli |

## Post-Release Verification Checklist

- [ ] `npm view @coderooz/core` shows correct version
- [ ] `npm view expo-template-coderooz` shows correct version
- [ ] `npm view @coderooz/create-app` shows correct version
- [ ] `npm view @coderooz/cli` shows correct version
- [ ] `npx @coderooz/cli --version` returns correct version
- [ ] `npx @coderooz/cli create test-app --with sqlite` scaffolds without errors
- [ ] `cd test-app && npm install` completes without errors
- [ ] `cd test-app && npx @coderooz/cli add camera` adds camera feature
- [ ] `cd test-app && npx @coderooz/cli update` reconciles without errors
- [ ] Tag exists on GitHub: `git tag -l "v*"`
- [ ] GitHub Actions release workflow completed (if applicable)
