import express from "express";
import validateBody from "../middlewares/validateBody.middlewares";
import { MovieSchemaReq, MovieUpdateSchema } from "../schemas/movie.schema";
import { createMoviesController, destroyController, readController, retrieveController} from "../controllers/movies.controllers";
import { checkMovieExistsById } from "../middlewares/checkMovieExistsById.middlewares";
import { checkName } from "../middlewares/checkName.middlewares";

const router = express.Router()
router.post("/movies", validateBody(MovieSchemaReq), createMoviesController)
router.get("/movies", readController)
router.patch("/movies/:id",validateBody(MovieUpdateSchema),checkMovieExistsById,checkName, retrieveController)
router.delete("/movies/:id",checkMovieExistsById, destroyController)

export default router;