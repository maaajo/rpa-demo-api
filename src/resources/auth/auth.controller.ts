import { Prisma } from "@prisma/client";
import { Request, NextFunction } from "express";
import { TypedResponse } from "../../utils/interfaces/typedResponse.interface";

const register = async (
  req: Request<{}, {}, Prisma.UserCreateArgs["data"]>,
  res: TypedResponse,
  next: NextFunction
) => {
  const test = req.body;
};
