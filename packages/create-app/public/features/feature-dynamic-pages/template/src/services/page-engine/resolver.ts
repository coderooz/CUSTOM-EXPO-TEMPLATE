import { ConfigLoader } from './loader';
import { registry } from './registry';
import type { PageConfig, SectionConfig } from './types';

export class PageResolver {
  private loader: ConfigLoader;

  constructor(loader: ConfigLoader) {
    this.loader = loader;
  }

  resolve(slug: string): ResolvedPage | null {
    const config = this.loader.getPage(slug);
    if (!config) return null;

    const template = registry.getTemplate(config.template);
    const validSections = config.sections.filter((s) => registry.hasComponent(s.type));

    return {
      config,
      template: template ?? null,
      sections: validSections,
      unknownSections: config.sections.filter((s) => !registry.hasComponent(s.type)),
    };
  }

  resolveSection(section: SectionConfig): ResolvedSection {
    const component = registry.getComponent(section.type);
    return {
      config: section,
      component: component ?? null,
      hasComponent: !!component,
    };
  }
}

export interface ResolvedPage {
  config: PageConfig;
  template: { id: string; name: string; version: number; slots: string[] } | null;
  sections: SectionConfig[];
  unknownSections: SectionConfig[];
}

export interface ResolvedSection {
  config: SectionConfig;
  component: React.ComponentType<SectionConfig> | null;
  hasComponent: boolean;
}
