import type { ComponentType } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

interface SvgIconDefinition {
  component: ComponentType<{ width: number; height: number; fill: string }>;
  viewBox?: string;
}

const customIcons: Record<string, SvgIconDefinition> = {};

export function registerCustomIcon(
  name: string,
  component: SvgIconDefinition['component'],
  viewBox?: string,
): void {
  customIcons[name] = { component, viewBox };
}

export function getCustomIcon(name: string): SvgIconDefinition | undefined {
  return customIcons[name];
}

export function hasCustomIcon(name: string): boolean {
  return name in customIcons;
}
