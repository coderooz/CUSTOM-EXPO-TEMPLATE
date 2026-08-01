import { describe, it, expect } from 'vitest';
import {
  SectionConfigSchema,
  PageConfigSchema,
  PagesManifestSchema,
} from '../template/src/services/page-engine/schemas';

describe('SectionConfigSchema', () => {
  it('validates a minimal section', () => {
    const section = { id: 'hero', type: 'hero' };
    expect(SectionConfigSchema.parse(section)).toEqual(section);
  });

  it('validates a full section with data, style, and children', () => {
    const section = {
      id: 'list',
      type: 'card-list',
      title: 'Products',
      subtitle: 'Browse',
      data: { items: [{ name: 'A' }] },
      style: { padding: 16 },
      children: [{ id: 'nested', type: 'text' }],
    };
    const parsed = SectionConfigSchema.parse(section);
    expect(parsed.children).toHaveLength(1);
    expect(parsed.data).toEqual({ items: [{ name: 'A' }] });
  });

  it('rejects a section without id', () => {
    expect(() => SectionConfigSchema.parse({ type: 'hero' })).toThrow();
  });

  it('rejects a section without type', () => {
    expect(() => SectionConfigSchema.parse({ id: 'hero' })).toThrow();
  });
});

describe('PageConfigSchema', () => {
  const page = {
    slug: 'home',
    title: 'Home',
    template: 'marketing',
    sections: [{ id: 'hero', type: 'hero' }],
    configVersion: 1,
  };

  it('validates a minimal page', () => {
    expect(PageConfigSchema.parse(page).slug).toBe('home');
  });

  it('validates auth block', () => {
    const withAuth = { ...page, auth: { required: true, roles: ['admin'] } };
    const parsed = PageConfigSchema.parse(withAuth);
    expect(parsed.auth).toEqual({ required: true, roles: ['admin'] });
  });

  it('validates metadata', () => {
    const withMeta = { ...page, metadata: { title: 'My Home' } };
    expect(PageConfigSchema.parse(withMeta).metadata?.title).toBe('My Home');
  });

  it('rejects a page without slug', () => {
    const { slug, ...rest } = page;
    expect(() => PageConfigSchema.parse(rest)).toThrow();
  });

  it('rejects a page without configVersion', () => {
    const { configVersion, ...rest } = page;
    expect(() => PageConfigSchema.parse(rest)).toThrow();
  });

  it('rejects non-positive configVersion', () => {
    expect(() => PageConfigSchema.parse({ ...page, configVersion: 0 })).toThrow();
  });
});

describe('PagesManifestSchema', () => {
  const manifest = {
    pages: [
      { slug: 'home', title: 'Home', template: 'marketing', sections: [], configVersion: 1 },
    ],
  };

  it('validates a manifest', () => {
    expect(PagesManifestSchema.parse(manifest).pages).toHaveLength(1);
  });

  it('defaults schemaVersion to 1', () => {
    expect(PagesManifestSchema.parse(manifest).schemaVersion).toBe(1);
  });

  it('preserves an explicit schemaVersion', () => {
    expect(PagesManifestSchema.parse({ ...manifest, schemaVersion: 3 }).schemaVersion).toBe(3);
  });

  it('accepts an empty pages array as a valid no-pages state', () => {
    expect(PagesManifestSchema.parse({ pages: [] }).pages).toEqual([]);
  });

  it('rejects a manifest without pages', () => {
    expect(() => PagesManifestSchema.parse({})).toThrow();
  });
});
