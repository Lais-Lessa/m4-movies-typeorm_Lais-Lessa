import { z } from "zod";


export const MovieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number().positive().int(),
    price: z.number().positive().int(),
  });

export const MovieResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    duration: z.number(),
    price: z.number(),
  })
  
export const MovieSchemaReq = MovieSchema.omit({ id: true });
export const MovieUpdateSchema = MovieSchema.partial();