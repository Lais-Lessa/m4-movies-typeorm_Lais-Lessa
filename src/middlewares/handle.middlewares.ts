import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import AppError from "../error";
import { z } from "zod";

const error = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({ message: err.flatten().fieldErrors });
  }

  console.error(err);

  return res.status(500).json({ message: "Internal server error" });
};

export default { error }