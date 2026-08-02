/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/hooks/useStorage.ts
 * @accessPath @/hooks/useStorage
 * @description A storage hook for handling data in realtime.
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0 - Initial Creation
 */
import { useEffect, useState } from "react";
import storage from "@/lib/storage";

export function useStorage<T = any>(key: string) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    storage.get<T>(key).then(setValue);
  }, [key]);

  const update = async (val: T) => {
    await storage.set(key, val);
    setValue(val);
  };

  return { value, setValue: update };
}
