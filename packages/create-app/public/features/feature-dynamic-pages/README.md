# @coderooz/feature-dynamic-pages

Configuration-driven dynamic page builder for Coderooz Expo projects.

## How It Works

Pages are defined in JSON config files (remote or local) describing:
1. **Template** — layout blueprint (e.g., "marketing", "dashboard", "settings")
2. **Content** — text, images, data points for each section
3. **Actions** — string keys mapped to registered handler functions

The engine resolves: `Route → PageConfig → Template → Sections → Rendered UI`

### Config Source

Configs are fetched from a remote endpoint (API/CDN), validated with Zod, and cached in SQLite for offline access. Updates are detected via polling or push notification.

### Component Registry

All renderable sections must be pre-registered:

```ts
registerComponent('hero-banner', HeroBanner);
registerComponent('feature-grid', FeatureGrid);
```

### Action Registry

Functions are registered by string key:

```ts
registerAction('navigate:settings', () => navigation.navigate('Settings'));
registerAction('api:submit-contact', submitContactForm);
```

### Templates

Built-in templates: marketing, dashboard, settings, form, blank. Custom templates can be registered.

## Usage

```tsx
// Wrap app with provider (handles config loading, caching, hot-reload)
<PageEngineProvider configUrl="https://api.example.com/pages">
  <App />
</PageEngineProvider>

// Use DynamicScreen as a catch-all route
<Stack.Screen name="[slug]" component={DynamicScreen} />
```

## Install

```sh
npx @coderooz/cli add dynamic-pages
```

Installs `design-system`, `components`, and `sqlite` automatically via `requires`.

## Testing

```sh
npm run test -w @coderooz/feature-dynamic-pages
```
