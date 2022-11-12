import { Prisma } from "@prisma/client";
import { Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getPrismaErrorMessage } from "../../utils/db/prismaErrorHandler";
import { CustomException } from "../../utils/exceptions/http.exception";
import { ITypedResponse } from "../../utils/interfaces/typedResponse.interface";
import { createNewUser, getUserPasswordByEmail } from "../user/user.service";
import { ILogin } from "./auth.interface";

type TCreateNewUser = Awaited<ReturnType<typeof createNewUser>>;

const registerController = async (
  req: Request<{}, {}, Prisma.UserCreateArgs["data"]>,
  res: ITypedResponse<TCreateNewUser>,
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
    const prismaErrorMessage = getPrismaErrorMessage(error);
    const customException = new CustomException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      prismaErrorMessage || error
    );
    return next(customException);
  }
};

const loginController = async (
  req: Request<{}, {}, ILogin>,
  res: ITypedResponse<string>,
  next: NextFunction
) => {
  try {
    const { email: providedEmail, password: providedPassword } = req.body;

    const getHashedPasswordResult = await getUserPasswordByEmail(providedEmail);

    if (!getHashedPasswordResult) {
      const customException = new CustomException(
        StatusCodes.NOT_FOUND,
        "Email not found"
      );
      return next(customException);
    }

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      result: "SUCCESS",
      data: getHashedPasswordResult.password,
    });
  } catch (error: any) {
    const customException = new CustomException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
    return next(customException);
  }
};

export { registerController, loginController };
