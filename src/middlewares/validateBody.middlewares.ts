import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";


const validateBody =  (schema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = schema.parse(req.body);

      req.body = validatedBody;
         
      return next();

    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: Record<string, string[]> = {};
        error.errors.forEach((validationError) => {
          const fieldName = validationError.path.join(".");
          const errorMessage = validationError.message;
          if (!errorMessages[fieldName]) {
            errorMessages[fieldName] = [];
          }
          errorMessages[fieldName].push(errorMessage);
        });
        return res.status(400).json({ message: errorMessages });
    }
  }
}

export default validateBody;