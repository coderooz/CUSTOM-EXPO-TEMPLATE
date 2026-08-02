/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/lib/storage.ts
 * @accessPath @/lib/storage
 * @description
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  /** Save any value (string, number, boolean, object) */
  async set<T = any>(key: string, value: T): Promise<void> {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
    } catch (error) {
      console.error(`[storage:set] Error storing key "${key}"`, error);
    }
  }

  /** Get a stored value directly (auto JSON parse). Returns null if not found */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? (JSON.parse(json) as T) : null;
    } catch (error) {
      console.error(`[storage:get] Error reading key "${key}"`, error);
      return null;
    }
  }

  /** Update an existing key without rewriting full object */
  async update<T extends object = any>(
    key: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const prev = (await this.get<T>(key)) || {};
      const merged = { ...prev, ...data };
      await this.set(key, merged);
    } catch (error) {
      console.error(`[storage:update] Error updating key "${key}"`, error);
    }
  }

  /** Remove a key */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[storage:remove] Error removing key "${key}"`, error);
    }
  }

  /** Clear all storage */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("[storage:clear] Error clearing AsyncStorage", error);
    }
  }
}

const storage = new Storage();
export default storage;
