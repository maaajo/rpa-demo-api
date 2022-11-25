import { Prisma } from "@prisma/client";
import { db } from "../../db/prisma.db";

type TRefreshTokenUniqueValues = Prisma.RefreshTokenFindUniqueArgs["where"];
type TRefreshTokenInputData = Prisma.RefreshTokenCreateArgs["data"];

const saveRefreshToken = async (
  refreshTokenData: Prisma.RefreshTokenCreateArgs["data"]
) => {
  return await db.refreshToken.create({ data: refreshTokenData });
};

const getRefreshTokenDetails = async (
  findValues: TRefreshTokenUniqueValues
) => {
  return await db.refreshToken.findUnique({
    where: findValues,
  });
};

const updateRefreshToken = async (
  findValues: TRefreshTokenUniqueValues,
  dataToUpdate: Prisma.RefreshTokenUpdateArgs["data"]
) => {
  return await db.refreshToken.update({
    where: findValues,
    data: dataToUpdate,
  });
};

export { saveRefreshToken, updateRefreshToken, getRefreshTokenDetails };
