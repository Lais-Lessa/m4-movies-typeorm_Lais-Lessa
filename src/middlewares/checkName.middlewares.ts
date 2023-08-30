import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

export const checkName = async (req: Request, res: Response, next: NextFunction) => {
    
    const { name } = req.body;
  
    if (name !== undefined) {
  
      const movieRepository = AppDataSource.getRepository(Movie);
    
      const existingMovie= await movieRepository.findOne({ where: { name } });
    
      if (existingMovie) {
        return res.status(409).json({ message: "Movie already exists." });
      }
  
    }  
    return next();
  };