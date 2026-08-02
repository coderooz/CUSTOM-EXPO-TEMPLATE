# @coderooz/feature-pages

Standard info screens for Coderooz Expo projects. Provides About, Licenses, Policies, and other common screens used in mobile apps.

## What's Included

- **AboutScreen** — App version, build number, developer info with social links
- **LicensesScreen** — Open-source license acknowledgments
- **PoliciesScreen** — Privacy Policy, Terms of Service, EULA

## Usage

Screens are placed at `@/screens/pages/`. Add them to your navigation:

```tsx
import { AboutScreen } from '@/screens/pages/AboutScreen';

<Stack.Screen name="About" component={AboutScreen} />
```

## Install

```sh
npx @coderooz/cli add pages
```
