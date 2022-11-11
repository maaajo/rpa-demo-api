import { Prisma, User } from "@prisma/client";
import { Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomException } from "../../utils/exceptions/http.exception";
import { TypedResponse } from "../../utils/interfaces/typedResponse.interface";
import { createNewUser } from "../user/user.service";

const registerController = async (
  req: Request<{}, {}, Prisma.UserCreateArgs["data"]>,
  res: TypedResponse<Omit<User, "password">>,
  next: NextFunction
) => {
  try {
    const user = await createNewUser(req.body);

    return res.status(StatusCodes.CREATED).json({
      code: StatusCodes.OK,
      result: "SUCCESS",
      data: user,
    });
  } catch (error: any) {
    const customException = new CustomException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
    return next(customException);
  }
};

export { registerController };
