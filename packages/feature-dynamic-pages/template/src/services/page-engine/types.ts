export interface PageConfig {
  slug: string;
  title: string;
  description?: string;
  template: string;
  sections: SectionConfig[];
  metadata?: Record<string, string>;
  auth?: { required: boolean; roles?: string[] };
  configVersion: number;
}

export interface SectionConfig {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  data?: Record<string, unknown>;
  style?: Record<string, unknown>;
  condition?: string;
  children?: SectionConfig[];
}

export interface TemplateDef {
  id: string;
  name: string;
  description?: string;
  version: number;
  slots: string[];
}

export interface ActionDef {
  key: string;
  handler: (...args: unknown[]) => unknown;
  description?: string;
}

export interface ComponentDef {
  type: string;
  component: React.ComponentType<SectionConfig>;
  schema?: unknown;
}

export interface CacheEntry {
  key: string;
  data: string;
  version: number;
  updatedAt: number;
}

export interface StalePageInfo {
  slug: string;
  title: string;
  oldVersion: number;
  newVersion: number;
}

export interface PageEngineConfig {
  configUrl: string;
  pollIntervalMs?: number;
  onError?: (error: Error) => void;
}
