import { Migration } from './types';

const migrations: Migration[] = [
  {
    version: 1,
    name: 'create-initial-tables',
    sql: `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version INTEGER NOT NULL UNIQUE,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `,
  },
];

export async function runMigrations(db: { execAsync: (sql: string) => Promise<void>; getAllAsync: (sql: string) => Promise<unknown[]> }): Promise<void> {
  await db.execAsync(migrations[0].sql);

  const rows = await db.getAllAsync(
    'SELECT version FROM migrations ORDER BY version DESC LIMIT 1',
  );
  const currentVersion = (rows[0] as { version?: number })?.version ?? 0;

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      await db.execAsync(migration.sql);
      await db.execAsync(
        `INSERT INTO migrations (version, name) VALUES (${migration.version}, '${migration.name}')`,
      );
    }
  }
}

export function getMigrations(): Migration[] {
  return migrations;
}
