import { getDatabase } from './index';

export async function seedIfEmpty(): Promise<void> {
  const db = getDatabase();
  const tables = await db.getAllAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != 'migrations'",
  );

  for (const table of tables) {
    const count = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM "${table.name}"`,
    );
    if (count[0]?.count === 0) {
      console.log(`Table "${table.name}" is empty — seed data may be needed here.`);
    }
  }
}
