import * as SQLite from 'expo-sqlite';
import { DatabaseConfig } from './types';
import { runMigrations } from './migrations';

let db: SQLite.SQLiteDatabase | null = null;

export async function initializeDatabase(config: DatabaseConfig = { name: 'app.db' }): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  db = await SQLite.openDatabaseAsync(config.name);
  await runMigrations(db);
  return db;
}

export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

export async function executeQuery<T = unknown>(sql: string, ...params: SQLite.SQLiteBindValue[]): Promise<T[]> {
  const database = getDatabase();
  return await database.getAllAsync<T>(sql, ...params);
}

export async function executeRun(sql: string, ...params: SQLite.SQLiteBindValue[]): Promise<void> {
  const database = getDatabase();
  await database.runAsync(sql, ...params);
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
