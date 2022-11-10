import { TypedResponse } from "../interfaces/typedResponse.interface";
import { Request, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export default function notFound(
  req: Request,
  res: TypedResponse,
  next: NextFunction
) {
  return res.status(StatusCodes.NOT_FOUND).json({
    code: StatusCodes.NOT_FOUND,
    error: ReasonPhrases.NOT_FOUND,
    result: "ERROR",
  });
}
