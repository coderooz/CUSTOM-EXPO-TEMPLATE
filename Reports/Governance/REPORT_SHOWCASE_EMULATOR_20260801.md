# Showcase Emulator Verification — Report

**Report ID:** REPORT_SHOWCASE_EMULATOR_20260801
**Date:** 2026-08-01
**Author:** OpenCode (AI agent)
**Status:** Final
**Category:** Governance

---

## Executive Summary

Verified the `examples/showcase/` app (all 8 composable feature demos) on the Android
emulator (`emulator-5554`, Expo Go) via the local Metro dev server. Every demo screen
renders and interactive paths work end-to-end. One real layout bug was found and fixed in
the Dynamic Pages demo (a `flex: 1` ScrollView collapsed to zero height inside a
non-flex `VStack`, rendering a blank screen); the fix is committed to the
showcase-overlay source and regenerated into `examples/showcase/`. A dangling global
junction (`npm\node_modules\expo-template-coderooz`) that pointed at a non-existent
`C:\Code Works\...` path was repaired. Full validation suite is green (lint, typecheck,
112 tests, build:all). No secrets, no temp files, no root-level clutter.

---

## Details

### Bug Found & Fixed — Dynamic Pages demo blank screen

- **Root cause:** `DynamicPagesDemoScreen` rendered a `ScrollView` (flex-child) inside a
  `<VStack gap={4}>` that had no `flex: 1` and no fixed height. In React Native,
  `ScrollView` collapses to zero height when its parent doesn't constrain it, so the
  entire config-driven page rendered nothing visible.
- **Fix:** `scripts/showcase-overlay/src/screens/showcase/DynamicPagesDemoScreen.tsx:17`
  → `<VStack gap={4} style={{ flex: 1 }}>`.
- **Propagation:** regenerated `examples/showcase/` via
  `node scripts/build-example.js --config examples/showcase.json`, reinstalled deps
  (1001 packages), reloaded Expo Go from `exp://127.0.0.1:59890`.
- **Verified after fix:** full home page renders — hero ("Build Expo apps faster",
  subtitle, "Get Started" CTA), "What is inside" feature grid (Design System, UI
  Components, SQLite, Dynamic Pages, Notifications, Auth), and "Ready to build?" CTA
  section.

### Environment / Tooling Notes

- Metro served on port **59890** (8081/50169 stale). The `expo_metro_status` MCP tool
  reported `running: false` for the alive server (lost session); liveness confirmed via
  `curl http://127.0.0.1:59890/status` → `packager-status:running`.
- adb was wedged (80+ hung `adb.exe` processes after earlier testing). Recovered by
  killing all adb processes and restarting; `adb reverse tcp:59890 tcp:59890` restored.
- Expo Go app was relaunched into the local dev server with
  `am start -a android.intent.action.VIEW -d "exp://127.0.0.1:59890"`.
- An "expo-notifications … removed from Expo Go SDK 53" console warning appears as an
  overlay/toast. This is an **expected** SDK 53 limitation (remote push needs a dev
  build), not a defect in the template.

### Junction Repair

`C:\Users\ranit\AppData\Roaming\npm\node_modules\expo-template-coderooz` was a junction
pointing at the non-existent `C:\Code Works\HTML_CSS_JS\...` (space in `Code Works`,
wrong drive-level path). Removed the dangling junction and recreated it targeting the
real repo `C:\Code_Works\HTML_CSS_JS\workProjects\application\expo-template-coderooz`.
`Test-Path ...\package.json` now resolves and `packages/` lists correctly.

---

## Demo-by-Demo Verification Results

| # | Demo | Rendered | Interactive check | Result |
|---|------|----------|-------------------|--------|
| 1 | Design System / Theme | Tokens, color schemes, light/dark/high-contrast, toggle | High-contrast chip switched mode label | PASS |
| 2 | UI Components | Buttons, inputs, chips, switch, states | Primary button counter 0 → 1 | PASS |
| 3 | SQLite | Typed query + note list | "Hello from showcase" → "Inserted 1 note(s)" → listed `#1 · 2026-08-01 03:51:15` | PASS |
| 4 | Dynamic Pages | Hero, feature grid, CTA (config-driven) | Scroll through sections | PASS (after fix) |
| 5 | Notifications | Screen reached | N/A (remote push unsupported in Expo Go SDK 53 — expected warning) | PASS (screen) |
| 6 | Icons | 6 families + 6 icons + env-default family | N/A | PASS |
| 7 | Auth | Login form + auth state panel | N/A (no backend; "Login will fail" noted in UI) | PASS (screen) |
| 8 | Info Pages | About / Licenses / Policies list | About → "MyApp" + version + contact links | PASS |

All 8 feature demos verified; interactive elements confirmed working where applicable.

---

## Validation Results

| Check | Command | Result |
|-------|---------|--------|
| Root typecheck | `npm run typecheck` | Clean |
| Root lint | `npm run lint` | Clean |
| Tests | `npm test` + vitest in design-system/dynamic-pages | 112 passed (55 core + 17 design-system + 40 dynamic-pages) |
| Build all | `npm run build:all` | Clean; all 12 feature packages validated |

---

## Commits

| Commit | Contents |
|--------|----------|
| `REPORT_SHOWCASE_EMULATOR_20260801` (this report) | Emulator verification results + governance report |
| `fix(showcase): ...` | `DynamicPagesDemoScreen.tsx` `flex: 1` fix (showcase-overlay source) |

---

## Recommendations

1. Consider the Expo Go SDK 53 push-notification warning: document in `docs/features.md`
   that Notifications demo remote-push requires a development build (not Expo Go).
2. The `expo_metro_status` MCP session drift is a tooling limitation; when Metro is
   running but the MCP tool reports `running: false`, verify with
   `curl http://127.0.0.1:<port>/status`.
3. `examples/showcase/` remains intentionally untracked (generated artifact; CI writes
   it to `examples/<name>` branches). Keep treating it as regenerated output.
4. adb hygiene: avoid leaving long-running Metro/adb sessions across days; recover via
   `adb kill-server` when wedged.

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-01 | Initial creation |
