import { Prisma, Role } from "@prisma/client";
import { Request, NextFunction, Response } from "express";
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
  getUserById,
} from "../user/user.service";
import {
  IJwtVerifyRefreshPayload,
  ILoginRequest,
  IRefreshRequest,
} from "./auth.interface";
import * as bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  getPublicKey,
} from "../../utils/auth/jwt.utils";
import {
  getRefreshTokenDetails,
  saveRefreshToken,
  updateRefreshToken,
} from "./auth.service";
import * as jwt from "jsonwebtoken";

const registerController = async (
  req: Request<{}, {}, Prisma.UserCreateArgs["data"]>,
  res: ITypedResponse<ReturnType<typeof cleanUserResponse>>,
  next: NextFunction
) => {
  try {
    const user = await createNewUser({ ...req.body, lastLoginIp: req.ip });

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
  req: Request<{}, {}, ILoginRequest>,
  res: ITypedResponse<{ accessToken: string; refreshToken: string }>,
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

    const { id: userId, role: userRole } = getUserResult;

    const isPasswordValid = await bcrypt.compare(
      providedPassword,
      getUserResult.password
    );

    if (!isPasswordValid) {
      await insertLastFailedAuthAttempt(userId);
      const customException = new CustomException(
        StatusCodes.BAD_REQUEST,
        "Invalid Password"
      );
      return next(customException);
    }

    const accessToken = await createAccessToken({
      id: userId,
      role: userRole,
    });

    const refreshToken = await createRefreshToken({
      id: userId,
      role: userRole,
      ip: req.ip,
    });

    await insertSuccessAuthAttempt(userId);
    await saveRefreshToken({ token: refreshToken, userId });

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      result: "SUCCESS",
      data: {
        accessToken,
        refreshToken,
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

const refreshTokenController = async (
  req: Request<{}, {}, IRefreshRequest>,
  res: ITypedResponse<{ accessToken: string; refreshToken: string }>,
  next: NextFunction
) => {
  try {
    const refreshToken = req.body.refreshToken;

    const publicKey = await getPublicKey();

    const decodedToken = jwt.verify(
      refreshToken,
      publicKey
    ) as IJwtVerifyRefreshPayload;

    const tokenDetails = await getRefreshTokenDetails({ token: refreshToken });

    if (!tokenDetails) {
      const customException = new CustomException(
        StatusCodes.BAD_REQUEST,
        "Invalid refresh token"
      );
      next(customException);
    } else {
      if (
        !tokenDetails.isActive ||
        tokenDetails.isExpired ||
        tokenDetails.revokedByIp
      ) {
        const customException = new CustomException(
          StatusCodes.BAD_REQUEST,
          "Invalid refresh token"
        );
        next(customException);
      }
    }

    const user = await getUserById(decodedToken.id);

    if (!user) {
      const customException = new CustomException(
        StatusCodes.BAD_REQUEST,
        "Invalid refresh token"
      );
      next(customException);
    }

    const { id: userId } = user!;

    const newRefreshToken = await createRefreshToken({
      id: userId,
      ip: req.ip,
      role: Role.USER,
    });

    const newAccessToken = await createAccessToken({
      id: userId,
      role: Role.USER,
    });

    await updateRefreshToken(
      { token: refreshToken },
      {
        revokedTime: new Date(),
        revokedByIp: req.ip,
        replacedByToken: newRefreshToken,
        isExpired: true,
        isActive: false,
      }
    );

    await saveRefreshToken({ token: newRefreshToken, userId });

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      result: "SUCCESS",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error: any) {
    const customException = new CustomException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unexpected error"
    );
    next(customException);
  }
};

export { registerController, loginController, refreshTokenController };
