# @coderooz/feature-design-system

Design system foundation for Coderooz Expo projects.

## What's Included

- **Design Tokens** — spacing, borderRadius, typography scale, shadows, animation
- **Color System** — semantic color palette with light/dark/high-contrast modes
- **Built-in Color Schemes** — neutral, slate, gray, zinc, stone, default, rose, green, amber, violet (like shadcn/ui)
- **Theme Provider** — React Context with mode switching, persistence, and system preference detection
- **Primitives** — Unstyled accessible base components (Pressable, Text, View, Icon)

## Usage

```ts
import { colorSchemes, getColorScheme } from '@/theme';
import { spacing, typography, shadow } from '@/theme/tokens';

const theme = getColorScheme('default');
```

## Install

```sh
npx @coderooz/cli add design-system
```
