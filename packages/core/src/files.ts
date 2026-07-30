import { readdirSync, statSync, mkdirSync, copyFileSync } from 'fs';
import { join, relative, dirname } from 'path';

export function copyTemplateFiles(
  templateDir: string,
  targetDir: string,
): number {
  let count = 0;

  function copyRecursive(source: string, dest: string): void {
    const entries = readdirSync(source);
    for (const entry of entries) {
      const sourcePath = join(source, entry);
      const destPath = join(dest, entry);
      const stat = statSync(sourcePath);

      if (stat.isDirectory()) {
        mkdirSync(destPath, { recursive: true });
        copyRecursive(sourcePath, destPath);
      } else {
        mkdirSync(dirname(destPath), { recursive: true });
        copyFileSync(sourcePath, destPath);
        count++;
      }
    }
  }

  if (!isDirectory(templateDir)) return 0;

  copyRecursive(templateDir, targetDir);
  return count;
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}
