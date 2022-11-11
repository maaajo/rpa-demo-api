import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject } from "zod";
import { CustomException } from "../exceptions/http.exception";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const parseResult = await schema.safeParseAsync({
      body: req.body,
    });

    if (parseResult.success) {
      next();
    } else {
      const error = new CustomException(
        StatusCodes.BAD_REQUEST,
        parseResult.error.message
      );
      next(error);
    }
  };

export { validateRequest };
