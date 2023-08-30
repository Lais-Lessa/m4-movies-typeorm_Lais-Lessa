import { AppDataSource } from "./data-source";
import { Movie } from "./entities";

export const movieRepo = AppDataSource.getRepository(Movie)