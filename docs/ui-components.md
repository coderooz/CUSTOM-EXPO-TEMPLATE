# UI Components

The base template ships with a small set of core components. Feature packages add more (see `@coderooz/feature-components` for buttons, inputs, dialogs, sheets, and snackbars).

| Component | Location | Description |
|-----------|----------|-------------|
| Button | `src/components/items/Button.tsx` | Primary + secondary buttons |
| Header | `src/components/Header.tsx` | Top navigation bar |
| Loading | `src/components/Loading.tsx` | Loading spinner overlay |
| LoginForm | `src/components/auth/LoginForm.tsx` | Auth sign-in form |
| SignupForm | `src/components/auth/SignupForm.tsx` | Auth sign-up form |

Example:

```tsx
import Header from "@/components/Header";
import { Button } from "@/components/items/Button";

<Header title="Dashboard" />
<Button variant="primary" onPress={() => {}} />
```

For a full design system (tokens, themes, primitives), add the design-system feature:

```sh
npx @coderooz/cli add design-system,components
```
