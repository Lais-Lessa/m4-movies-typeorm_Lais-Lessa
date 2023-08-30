import { NextFunction, Request, Response } from "express";
import { movieRepo } from "../repositories";

export const checkMovieExistsById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const movie = await movieRepo.findOne({
        where: { id: Number(id)}
    })

    if(!movie){
        return res.status(404).json({ "message": "Movie not found" })
    }

    return next()
}

