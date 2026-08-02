export interface Migration {
  version: number;
  name: string;
  sql: string;
}

export interface QueryResult<T = unknown> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export type DatabaseConfig = {
  name: string;
  version?: number;
};
