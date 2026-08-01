# Showcase Example

`examples/showcase/` is a **runnable Expo app** that demonstrates every feature package
working together in one project. It is the definitive reference for how the 12 features
compose.

## What It Shows

The showcase is generated from the base template plus an overlay
(`scripts/showcase-overlay/`) that configures all feature packages — SQLite with
migrations, camera, notifications, auth, biometrics, messages, pages, icons, Clerk,
the design system, components, and dynamic pages.

## Important

`examples/showcase/` is **generated output**. Never hand-edit it. Changes to the
template, feature packages, or overlay are applied by regenerating:

```bash
npm run build                      # re-bundle features into create-app/public
node scripts/build-example.js      # regenerate examples/showcase/
cd examples/showcase && npm install
npx tsc --noEmit                   # should be clean
```

## Running It

```bash
cd examples/showcase
npm start                          # Expo dev server
```

## Structure

```
examples/showcase/
├── src/                    # Woven app source (components, context, hooks, screens, services)
├── App.tsx                 # App entry (generated)
├── app.json                # Expo config with all feature plugins (generated)
├── package.json            # Merged dependencies (generated)
├── AGENTS.md               # Copied from the template (generated)
└── GOVERNANCE.md           # Copied from the template (generated)
```

Every feature package's `template/` directory is copied in, dependencies are merged,
and `app.json` plugins are appended — the same weave pipeline a real project gets via
`npx @coderooz/cli create`.
