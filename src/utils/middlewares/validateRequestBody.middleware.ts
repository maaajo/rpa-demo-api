import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject } from "zod";
import { CustomException } from "../exceptions/http.exception";

const validateRequestBody =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const zodParseResult = await schema.safeParseAsync({
      body: req.body,
    });

    if (zodParseResult.success) {
      return next();
    } else {
      const error = new CustomException(
        StatusCodes.BAD_REQUEST,
        zodParseResult.error.message
      );
      return next(error);
    }
  };

export { validateRequestBody };
