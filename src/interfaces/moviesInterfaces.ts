import { Movie } from "../entities";
import { MovieResponseSchema, MovieSchema, MovieUpdateSchema } from "../schemas/movie.schema";
import { z } from "zod"

type MovieCreate = z.infer<typeof MovieSchema>
type MovieRead = Array<Movie>
type MovieUpdate = z.infer<typeof MovieUpdateSchema>
type MovieRepo = z.infer<typeof MovieResponseSchema>

export interface TMovie extends Movie {}
export { MovieCreate, MovieRead, MovieUpdate, MovieRepo };