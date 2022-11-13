import { Prisma } from "@prisma/client";
import { Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getPrismaErrorMessage } from "../../utils/db/prismaErrorHandler";
import { CustomException } from "../../utils/exceptions/http.exception";
import { ITypedResponse } from "../../utils/interfaces/typedResponse.interface";
import {
  createNewUser,
  getUserByEmail,
  insertLastFailedAuthAttempt,
  insertSuccessAuthAttempt,
  cleanUserResponse,
} from "../user/user.service";
import { ILogin } from "./auth.interface";
import * as bcrypt from "bcrypt";
import { createJwtToken } from "../../utils/auth/jwt.utils";

type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const registerController = async (
  req: Request<{}, {}, Prisma.UserCreateArgs["data"]>,
  res: ITypedResponse<ReturnType<typeof cleanUserResponse>>,
  next: NextFunction
) => {
  try {
    const user = await createNewUser(req.body);

    const userCleaned = cleanUserResponse(user);

    return res.status(StatusCodes.CREATED).json({
      code: StatusCodes.OK,
      result: "SUCCESS",
      data: userCleaned,
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
  res: ITypedResponse<TLoginResponse>,
  next: NextFunction
) => {
  try {
    const { email: providedEmail, password: providedPassword } = req.body;

    const getUserResult = await getUserByEmail(providedEmail);

    if (!getUserResult) {
      const customException = new CustomException(
        StatusCodes.NOT_FOUND,
        "Email not found"
      );
      return next(customException);
    }

    const isPasswordValid = await bcrypt.compare(
      providedPassword,
      getUserResult.password
    );

    if (!isPasswordValid) {
      await insertLastFailedAuthAttempt(providedEmail);
      const customException = new CustomException(
        StatusCodes.BAD_REQUEST,
        "Invalid Password"
      );
      return next(customException);
    }

    const token = createJwtToken({
      email: providedEmail,
      role: getUserResult.role,
    });

    await insertSuccessAuthAttempt(providedEmail);

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      result: "SUCCESS",
      data: {
        accessToken: token,
        refreshToken: "test",
      },
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
