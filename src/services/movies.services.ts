import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import AppError from "../error";
import { TMovie } from "../interfaces/moviesInterfaces";
import { PaginationParams } from "../interfaces/pagination.interfaces";

export const movieCreateService =async (data: TMovie) => {

    const { name, description, duration, price } = data;

    const repository = AppDataSource.getRepository(Movie);

    const existingMovie = await repository.findOne({ where: { name } });
  
    if (existingMovie) {
      throw new AppError("Movie already exists.",409)
    }
  
    const movie = repository.create({
      name,
      description,
      duration,
      price,
    });

     const newMovie = await repository.save(movie);

     return newMovie;
  };
  export const readServices = async (params: PaginationParams) => {
    const repo = AppDataSource.getRepository(Movie);
    
    const { sort, order, page, perPage } = params;
  
    const perPageNew = parseInt(String(perPage), 10);
  
    const perPageVerify = perPageNew < 1 || isNaN(perPageNew) ? 10 : Math.min(perPageNew, 10);
  
    const pageNew = Math.max(page || 1, 1);
  
    const skip = (pageNew - 1) * perPageVerify;
  
    const query: any = {};
  
    if (sort === "price" || sort === "duration") {
      query.order = { [sort]: order };
    }
  
    const [data, count] = await repo.findAndCount({ ...query, skip, take: perPageVerify });
  
    const totalPages = Math.ceil(count / perPageVerify);
  
    return {
      prevPage: pageNew > 1 ? createPaginationLink(pageNew - 1, perPageNew) : null, // Update perPageVerify to perPageNew
      nextPage: pageNew < totalPages ? createPaginationLink(pageNew + 1, perPageNew) : null, // Update perPageVerify to perPageNew
      count,
      data,
    };
  };
  
const createPaginationLink = (page: number, perPage: number): string => {
  return `http://localhost:3000/movies?page=${page}&perPage=${perPage}`;
};


export const retrieveServices = async (
  id: number,
  name: string,
  description: string,
  duration: number,
  price: number
) => {
  const repository = AppDataSource.getRepository(Movie);

  const movieToUpdate = await repository.findOne({ where: { id } });

  if (!movieToUpdate) {
    return null;
  }

  if (name !== undefined) {
    movieToUpdate.name = name;
  }

  if (description !== undefined) {
    movieToUpdate.description = description;
  }

  if (duration !== undefined) {
    movieToUpdate.duration = duration;
  }

  if (price !== undefined) {
    movieToUpdate.price = price;
  }

  await repository.save(movieToUpdate);

  return movieToUpdate;
};


export const destroyServices = async (id: number) => {
  const repository = AppDataSource.getRepository(Movie);
  const movie = await repository.findOneBy({id: id})

  if(!movie) throw new AppError("Movie not found", 404)

  await repository.remove(movie)

}