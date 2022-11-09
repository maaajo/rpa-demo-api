import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      code: StatusCodes.NOT_FOUND,
      message: ReasonPhrases.NOT_FOUND,
    },
  });
}
