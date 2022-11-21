import { Prisma } from "@prisma/client";
import { db } from "../../db/prisma.db";

type TRefreshTokenUniqueValues = Prisma.RefreshTokenFindUniqueArgs["where"];
type TRefreshTokenInputData = Prisma.RefreshTokenCreateArgs["data"];

const saveRefreshToken = async (refreshTokenData: TRefreshTokenInputData) => {
  return await db.refreshToken.create({ data: refreshTokenData });
};

const getRefreshTokenUser = async (findValues: TRefreshTokenUniqueValues) => {
  return await db.refreshToken.findUnique({
    where: findValues,
    select: { user: true },
  });
};

const updateRefreshToken = async (
  findValues: TRefreshTokenUniqueValues,
  dataToUpdate: TRefreshTokenInputData
) => {
  return await db.refreshToken.update({
    where: findValues,
    data: dataToUpdate,
  });
};

export { saveRefreshToken };
