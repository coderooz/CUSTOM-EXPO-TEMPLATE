# @coderooz/feature-icons

Typed icon system for Coderooz Expo projects. Provides a unified, type-safe icon component wrapping `@expo/vector-icons` with common icon sets and a custom SVG icon registry.

## What's Included

- **Icon** component with typed icon names (Ionicons, MaterialIcons, Feather, and more)
- SVG icon registry for custom icons
- Helper utilities for icon size, color, and style management
- TypeScript types for autocomplete-safe icon usage

## Usage

```tsx
import { Icon, IconButton } from '@/services/icons';

// With autocomplete
<Icon name="heart" size={24} color="red" />
<Icon name="home-outline" family="Ionicons" />

// Icon button
<IconButton name="settings" onPress={() => {}} />

// Custom SVG icon
<Icon name="logo" family="Custom" size={32} />
```

## Install

```sh
npx @coderooz/cli add icons
```
