import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomException } from "../exceptions/http.exception";

function asyncCheckContentType(req: Request, allowedContentTypes: string[]) {
  const asyncResult = new Promise<void>((resolve, reject) => {
    if (req.is(allowedContentTypes)) {
      resolve();
    } else {
      const usedContentType = req.get("Content-Type");
      const errorMessage = `Unsupported Content-Type. You used: ${usedContentType} but only the following are allowed: ${allowedContentTypes.join(
        ", "
      )}.`;
      reject(errorMessage);
    }
  });

  return asyncResult;
}

const validateContentType =
  (allowedContentTypes: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncCheckContentType(req, allowedContentTypes);
      next();
    } catch (error: any) {
      const customError = new CustomException(
        StatusCodes.UNSUPPORTED_MEDIA_TYPE,
        error
      );
      next(customError);
    }
  };

export { validateContentType };
