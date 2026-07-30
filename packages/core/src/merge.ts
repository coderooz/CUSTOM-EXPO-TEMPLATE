import { ConfigMerge } from './types';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export type ArrayMergeStrategy = 'replace' | 'concat' | 'unique';

const PROTO_POISON_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

function isSafeKey(key: string): boolean {
  return !PROTO_POISON_KEYS.has(key);
}

export function deepMerge(
  target: unknown,
  source: unknown,
  arrayStrategy: ArrayMergeStrategy = 'replace',
  visited?: WeakSet<object>,
): unknown {
  if (visited) {
    if (typeof source === 'object' && source !== null && visited.has(source)) {
      return target;
    }
  }

  if (source === null || source === undefined) return target;
  if (target === null || target === undefined) return source;

  const seen = visited ?? new WeakSet<object>();
  if (typeof source === 'object' && source !== null) seen.add(source);
  if (typeof target === 'object' && target !== null) seen.add(target);

  if (Array.isArray(target) && Array.isArray(source)) {
    if (arrayStrategy === 'replace') return [...source];
    if (arrayStrategy === 'concat') return [...target, ...source];
    const merged = [...target];
    for (const item of source) {
      const exists = merged.some((t) =>
        typeof t === 'object' && t !== null
          ? JSON.stringify(t, safeReplacer) === JSON.stringify(item, safeReplacer)
          : t === item,
      );
      if (!exists) merged.push(item);
    }
    return merged;
  }

  if (typeof target === 'object' && typeof source === 'object' && !Array.isArray(target) && !Array.isArray(source)) {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(target as Record<string, unknown>)) {
      if (isSafeKey(key)) {
        result[key] = (target as Record<string, unknown>)[key];
      }
    }
    for (const key of Object.keys(source as Record<string, unknown>)) {
      if (isSafeKey(key)) {
        result[key] = deepMerge(
          (target as Record<string, unknown>)[key],
          (source as Record<string, unknown>)[key],
          arrayStrategy,
          seen,
        );
      }
    }
    return result;
  }

  return source;
}

function safeReplacer(_key: string, value: unknown): unknown {
  if (typeof value === 'object' && value !== null) {
    if (PROTO_POISON_KEYS.has(_key)) return undefined;
  }
  if (_key === '__proto__' || _key === 'prototype' || _key === 'constructor') {
    return undefined;
  }
  return value;
}

function setNested(obj: Record<string, unknown>, path: string, value: unknown, arrayStrategy: ArrayMergeStrategy = 'replace'): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!isSafeKey(keys[i])) return;
    if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
      current[keys[i]] = {};
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  const lastKey = keys[keys.length - 1];
  if (isSafeKey(lastKey)) {
    if (arrayStrategy !== 'replace' && Array.isArray(current[lastKey]) && Array.isArray(value)) {
      current[lastKey] = deepMerge(current[lastKey], value, arrayStrategy);
    } else {
      current[lastKey] = value;
    }
  }
}

export function applyConfigUpdates(
  projectDir: string,
  updates: ConfigMerge[],
  arrayStrategy: ArrayMergeStrategy = 'replace',
): void {
  for (const update of updates) {
    const filePath = `${projectDir}/${update.file}`;
    if (!existsSync(filePath)) {
      console.warn(`Config file not found: ${filePath}`);
      continue;
    }

    const content = readFileSync(filePath, 'utf-8');
    const config = JSON.parse(content);

    if (hasUnsafeKey(config)) {
      console.warn(`Unsafe keys detected in config, skipping: ${filePath}`);
      continue;
    }

    switch (update.type) {
      case 'merge': {
        const existing = getNested(config, update.path);
        setNested(config, update.path, deepMerge(existing, update.value, arrayStrategy), arrayStrategy);
        break;
      }
      case 'set':
        setNested(config, update.path, update.value);
        break;
      case 'plugin': {
        const plugins = config.expo?.plugins ?? [];
        if (typeof update.value === 'string' && !plugins.includes(update.value)) {
          plugins.push(update.value);
        }
        if (!config.expo) config.expo = {};
        config.expo.plugins = plugins;
        break;
      }
    }

    writeFileSync(filePath, JSON.stringify(config, null, 2) + '\n');
  }
}

function getNested(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export function mergeDependencies(
  existing: Record<string, string>,
  incoming: Record<string, string>,
): Record<string, string> {
  const merged = { ...existing };
  for (const [dep, version] of Object.entries(incoming)) {
    if (merged[dep] && merged[dep] !== version) {
      console.warn(`Version conflict for ${dep}: existing ${merged[dep]}, requested ${version}. Keeping existing.`);
    } else {
      merged[dep] = version;
    }
  }
  return merged;
}

function hasUnsafeKey(obj: Record<string, unknown>): boolean {
  for (const key of Object.keys(obj)) {
    if (!isSafeKey(key)) return true;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      return hasUnsafeKey(obj[key] as Record<string, unknown>);
    }
  }
  return false;
}
