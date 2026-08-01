import React from 'react';
import type { ComponentDef, ActionDef, TemplateDef, SectionConfig } from './types';

export class Registry {
  private components = new Map<string, ComponentDef>();
  private actions = new Map<string, ActionDef>();
  private templates = new Map<string, TemplateDef>();

  registerComponent(type: string, component: React.ComponentType<SectionConfig>, schema?: unknown): void {
    this.components.set(type, { type, component, schema });
  }

  getComponent(type: string): React.ComponentType<SectionConfig> | undefined {
    return this.components.get(type)?.component;
  }

  hasComponent(type: string): boolean {
    return this.components.has(type);
  }

  registerAction(key: string, handler: (...args: unknown[]) => unknown, description?: string): void {
    this.actions.set(key, { key, handler, description });
  }

  getAction(key: string): ((...args: unknown[]) => unknown) | undefined {
    return this.actions.get(key)?.handler;
  }

  hasAction(key: string): boolean {
    return this.actions.has(key);
  }

  registerTemplate(id: string, name: string, slots: string[], version = 1): void {
    this.templates.set(id, { id, name, version, slots });
  }

  getTemplate(id: string): TemplateDef | undefined {
    return this.templates.get(id);
  }

  getTemplateIds(): string[] {
    return Array.from(this.templates.keys());
  }

  getComponentTypes(): string[] {
    return Array.from(this.components.keys());
  }

  getActionKeys(): string[] {
    return Array.from(this.actions.keys());
  }

  clearComponents(): void {
    this.components.clear();
  }

  clearActions(): void {
    this.actions.clear();
  }
}

export const registry = new Registry();
