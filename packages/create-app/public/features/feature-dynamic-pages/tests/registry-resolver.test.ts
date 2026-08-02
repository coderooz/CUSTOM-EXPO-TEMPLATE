import { describe, it, expect, beforeEach } from 'vitest';
import { Registry, registry } from '../template/src/services/page-engine/registry';
import { PageResolver } from '../template/src/services/page-engine/resolver';
import { ConfigLoader } from '../template/src/services/page-engine/loader';

function TextComponent() {
  return null;
}

describe('Registry', () => {
  it('registers and retrieves components', () => {
    const reg = new Registry();
    reg.registerComponent('text', TextComponent);
    expect(reg.hasComponent('text')).toBe(true);
    expect(reg.getComponent('text')).toBe(TextComponent);
    expect(reg.getComponent('missing')).toBeUndefined();
  });

  it('lists registered component types', () => {
    const reg = new Registry();
    reg.registerComponent('text', TextComponent);
    reg.registerComponent('hero', TextComponent);
    expect(reg.getComponentTypes().sort()).toEqual(['hero', 'text']);
  });

  it('registers and retrieves actions', () => {
    const reg = new Registry();
    const handler = () => 42;
    reg.registerAction('save', handler, 'Persist data');
    expect(reg.hasAction('save')).toBe(true);
    expect(reg.getAction('save')).toBe(handler);
    expect(reg.getAction('missing')).toBeUndefined();
  });

  it('registers templates with slots and version', () => {
    const reg = new Registry();
    reg.registerTemplate('marketing', 'Marketing', ['hero', 'features'], 3);
    const tpl = reg.getTemplate('marketing');
    expect(tpl).toMatchObject({ id: 'marketing', name: 'Marketing', slots: ['hero', 'features'], version: 3 });
    expect(reg.getTemplate('missing')).toBeUndefined();
    expect(reg.getTemplateIds()).toEqual(['marketing']);
  });

  it('defaults template version to 1', () => {
    const reg = new Registry();
    reg.registerTemplate('basic', 'Basic', []);
    expect(reg.getTemplate('basic')?.version).toBe(1);
  });

  it('clears components and actions independently', () => {
    const reg = new Registry();
    reg.registerComponent('text', TextComponent);
    reg.registerAction('save', () => 1);
    reg.clearComponents();
    expect(reg.hasComponent('text')).toBe(false);
    expect(reg.hasAction('save')).toBe(true);
  });

  it('returns empty lists on a fresh registry', () => {
    const reg = new Registry();
    expect(reg.getComponentTypes()).toEqual([]);
    expect(reg.getActionKeys()).toEqual([]);
    expect(reg.getTemplateIds()).toEqual([]);
  });

  it('exposes a singleton instance', () => {
    expect(registry).toBeInstanceOf(Registry);
  });
});

describe('PageResolver', () => {
  const manifest = {
    pages: [
      {
        slug: 'home',
        title: 'Home',
        template: 'marketing',
        sections: [
          { id: 'hero', type: 'hero' },
          { id: 'unknown', type: 'does-not-exist' },
        ],
        configVersion: 1,
      },
    ],
    schemaVersion: 1,
  };

  beforeEach(() => {
    registry.clearComponents();
    registry.clearActions();
  });

  async function makeResolver() {
    registry.registerComponent('hero', TextComponent);
    registry.registerTemplate('marketing', 'Marketing', ['hero']);
    const loader = new ConfigLoader({
      configUrl: 'https://example.com/pages.json',
      fetchFn: async () =>
        Promise.resolve({ ok: true, status: 200, json: async () => manifest } as Response),
    });
    return new PageResolver(loader);
  }

  it('resolves a page with its template and valid sections', async () => {
    const resolver = await makeResolver();
    await (resolver as unknown as { loader: ConfigLoader }).loader.load();
    const resolved = resolver.resolve('home');
    expect(resolved).not.toBeNull();
    expect(resolved?.template?.name).toBe('Marketing');
    expect(resolved?.sections.map((s) => s.id)).toEqual(['hero']);
    expect(resolved?.unknownSections.map((s) => s.id)).toEqual(['unknown']);
  });

  it('returns null for an unknown slug', async () => {
    const resolver = await makeResolver();
    await (resolver as unknown as { loader: ConfigLoader }).loader.load();
    expect(resolver.resolve('nope')).toBeNull();
  });

  it('resolves a section to a component when registered', async () => {
    const resolver = await makeResolver();
    const resolved = resolver.resolveSection({ id: 'hero', type: 'hero' });
    expect(resolved.hasComponent).toBe(true);
    expect(resolved.component).toBe(TextComponent);
  });

  it('resolves a section without a component when unregistered', () => {
    registry.clearComponents();
    const loader = new ConfigLoader({ configUrl: 'https://example.com/pages.json' });
    const resolver = new PageResolver(loader);
    const resolved = resolver.resolveSection({ id: 'x', type: 'missing' });
    expect(resolved.hasComponent).toBe(false);
    expect(resolved.component).toBeNull();
  });
});
