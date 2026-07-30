import { z } from 'zod';

export const SectionConfigSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  data: z.record(z.unknown()).optional(),
  style: z.record(z.unknown()).optional(),
  condition: z.string().optional(),
  children: z.lazy(() => SectionConfigSchema.array().optional()),
});

export const PageConfigSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  template: z.string().min(1),
  sections: z.array(SectionConfigSchema),
  metadata: z.record(z.string()).optional(),
  auth: z.object({ required: z.boolean(), roles: z.array(z.string()).optional() }).optional(),
  configVersion: z.number().int().positive(),
});

export const PagesManifestSchema = z.object({
  pages: z.array(PageConfigSchema),
  updatedAt: z.string().datetime().optional(),
  schemaVersion: z.number().int().positive().default(1),
});

export type ValidatedPageConfig = z.infer<typeof PageConfigSchema>;
export type ValidatedPagesManifest = z.infer<typeof PagesManifestSchema>;
