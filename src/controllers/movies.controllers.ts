import { Request, Response } from "express";
import { MovieResponseSchema } from "../schemas/movie.schema";
import { Movie } from "../entities";
import { destroyServices, movieCreateService, readServices, retrieveServices } from "../services/movies.services";
import { PaginationParams } from "../interfaces/pagination.interfaces";

export const createMoviesController = async (req: Request, res: Response) => {

    const data: Movie = req.body


    const resultQuery = await movieCreateService(data)
    
    const formatedResponse = MovieResponseSchema.parse({
        id: resultQuery.id,
        name: resultQuery.name,
        description: resultQuery.description || null,
        duration: resultQuery.duration,
        price: resultQuery.price,
      });

    return res.status(201).json(formatedResponse);

}

export const readController = async (req: Request, res: Response) => {
  const {sort = "id", order = "asc", page, perPage} = req.query

  if(sort !== "id" && sort !== "price" && sort !== "duration") {
    return res.status(400).json({ error: "Invalid sort option" })
  }

  let changePage = parseInt(page as string, 10)
  let changePerPage = parseInt(perPage as string, 10)

  if(changePage <= 0 || isNaN(changePage)){
    changePage = 1
  }

  if(changePerPage <= 0 || isNaN(changePerPage)){
    changePerPage = 5
  }
  if (changePerPage > 5) {
    changePerPage = 5;
  }

  const params: PaginationParams = {
    sort: sort as "duration" || "price" || "id",
    order: order as "asc" || "desc",
    page: changePage,
    perPage: changePerPage,
  }

  readServices(params).then((movies) => {
    res.status(200).json(movies)
  }).catch(() => {
    res.status(500).json( {error: 'Internal server error' })
  })
  
};

export const retrieveController = async (req: Request, res: Response) => {

  const {id} = req.params
  
  const { duration, price, name, description} = req.body

  const retriever = await retrieveServices(
    Number(id),
    name,
    description,
    duration,
    price
  );

  if(retriever){
    return res.status(200).json(retriever)
  } else{
    return res.status(404).json({ error: 'Movie not found' })
  }
}

export const destroyController = async (req: Request, res: Response) => {
  const {id} = req.params
  await destroyServices(Number(id))
  return res.status(204).json({error: "An internal error ocurred"})
}