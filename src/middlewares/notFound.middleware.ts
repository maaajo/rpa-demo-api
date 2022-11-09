import { TypedResponse } from "../interfaces/typedResponse.interface";
import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export default function notFound(
  req: Request,
  res: TypedResponse,
  next: NextFunction
) {
  res.status(StatusCodes.NOT_FOUND).json({
    code: StatusCodes.NOT_FOUND,
    error: ReasonPhrases.NOT_FOUND,
    success: false,
  });
}
