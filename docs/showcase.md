# Showcase Example

`examples/showcase/` is a **runnable Expo app** that demonstrates a curated set of
feature packages working together in one project. It is the definitive reference for
how features compose. The showcase weaves 8 of the 12 features:

- **Design System** — tokens, color schemes, light/dark/high-contrast themes
- **UI Components** — buttons, inputs, cards, sheets, dialogs, layouts
- **SQLite** — typed database layer with migrations and seed support
- **Dynamic Pages** — config-driven pages resolved at runtime from a manifest
- **Notifications** — local notifications setup
- **Icons** — typed icon registry
- **Pages** — About, Licenses, Policies screens
- **Auth** — provider-agnostic auth service with secure token storage

## What It Shows

The showcase is generated from the base template plus an overlay
(`scripts/showcase-overlay/`) that configures the feature packages above. The remaining
feature packages (camera, biometrics, messages, clerk) are not included in the showcase
but can be added to any project via `npx @coderooz/cli add camera`.

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
