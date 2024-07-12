import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
