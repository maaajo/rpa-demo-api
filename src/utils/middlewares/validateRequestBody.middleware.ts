import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject, ZodError } from "zod";
import { CustomException } from "../exceptions/http.exception";

const getErrorMessage = (zodError: ZodError) => {
  const messages = zodError.issues.map((issue) => issue.message);

  return `Failed validating request body. Issues: [${messages.join(", ")}]`;
};

const validateRequestBody =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const zodParseResult = await schema.safeParseAsync({
      body: req.body,
    });

    if (zodParseResult.success) {
      return next();
    } else {
      const customException = new CustomException(
        StatusCodes.BAD_REQUEST,
        getErrorMessage(zodParseResult.error)
      );
      return next(customException);
    }
  };

export { validateRequestBody };
