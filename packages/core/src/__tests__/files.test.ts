import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { copyTemplateFiles } from '../files';

let sourceDir: string;
let targetDir: string;

beforeEach(() => {
  sourceDir = join(tmpdir(), `coderooz-test-source-${Date.now()}`);
  targetDir = join(tmpdir(), `coderooz-test-target-${Date.now()}`);
  mkdirSync(sourceDir, { recursive: true });
  mkdirSync(targetDir, { recursive: true });
});

afterEach(() => {
  rmSync(sourceDir, { recursive: true, force: true });
  rmSync(targetDir, { recursive: true, force: true });
});

describe('copyTemplateFiles', () => {
  it('copies files from source to target', () => {
    writeFileSync(join(sourceDir, 'hello.txt'), 'world');
    const count = copyTemplateFiles(sourceDir, targetDir);
    expect(count).toBe(1);
    expect(readFileSync(join(targetDir, 'hello.txt'), 'utf-8')).toBe('world');
  });

  it('copies nested directory structure', () => {
    mkdirSync(join(sourceDir, 'subdir'), { recursive: true });
    writeFileSync(join(sourceDir, 'subdir', 'nested.txt'), 'nested content');
    const count = copyTemplateFiles(sourceDir, targetDir);
    expect(count).toBe(1);
    expect(existsSync(join(targetDir, 'subdir', 'nested.txt'))).toBe(true);
    expect(readFileSync(join(targetDir, 'subdir', 'nested.txt'), 'utf-8')).toBe('nested content');
  });

  it('copies multiple files', () => {
    writeFileSync(join(sourceDir, 'a.txt'), 'a');
    writeFileSync(join(sourceDir, 'b.txt'), 'b');
    writeFileSync(join(sourceDir, 'c.txt'), 'c');
    const count = copyTemplateFiles(sourceDir, targetDir);
    expect(count).toBe(3);
  });

  it('returns 0 for nonexistent source directory', () => {
    const count = copyTemplateFiles(join(tmpdir(), 'nonexistent-dir-12345'), targetDir);
    expect(count).toBe(0);
  });

  it('returns 0 for empty source directory', () => {
    const count = copyTemplateFiles(sourceDir, targetDir);
    expect(count).toBe(0);
  });

  it('overwrites existing files in target', () => {
    writeFileSync(join(sourceDir, 'existing.txt'), 'new content');
    writeFileSync(join(targetDir, 'existing.txt'), 'old content');
    const count = copyTemplateFiles(sourceDir, targetDir);
    expect(count).toBe(1);
    expect(readFileSync(join(targetDir, 'existing.txt'), 'utf-8')).toBe('new content');
  });
});
