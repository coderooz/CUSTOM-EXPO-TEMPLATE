import type { ValidatedPagesManifest } from '@/services/page-engine/schemas';

export const showcaseManifest: ValidatedPagesManifest = {
  schemaVersion: 1,
  updatedAt: '2026-07-31T00:00:00.000Z',
  pages: [
    {
      slug: 'home',
      title: 'Coderooz Showcase',
      description: 'A config-driven page rendered at runtime by the page engine.',
      template: 'marketing',
      configVersion: 1,
      sections: [
        {
          id: 'hero',
          type: 'hero-banner',
          data: {
            title: 'Build Expo apps faster',
            subtitle: 'Composable feature packages woven into a production-ready template.',
            cta: { label: 'Get Started' },
          },
        },
        {
          id: 'features',
          type: 'feature-grid',
          title: 'What is inside',
          subtitle: 'Everything you need to ship',
          data: {
            items: [
              { icon: '🎨', title: 'Design System', description: 'Design tokens, color schemes, light/dark/high-contrast themes.' },
              { icon: '🧩', title: 'UI Components', description: 'Buttons, inputs, cards, sheets, dialogs and screen layouts.' },
              { icon: '🗄️', title: 'SQLite', description: 'Typed database layer with migrations and seed support.' },
              { icon: '📄', title: 'Dynamic Pages', description: 'Config-driven pages resolved at runtime from a manifest.' },
              { icon: '🔔', title: 'Notifications', description: 'Local and push notifications with channel management.' },
              { icon: '🔑', title: 'Auth', description: 'Provider-agnostic auth service with secure token storage.' },
            ],
          },
        },
        {
          id: 'cta',
          type: 'cta-section',
          data: {
            title: 'Ready to build?',
            description: 'Scaffold your app with npx @coderooz/cli create my-app --with sqlite,camera',
            cta: { label: 'Explore Features' },
          },
        },
      ],
    },
  ],
};
