import { Prisma } from "@prisma/client";
import { db } from "../../db/prisma.db";

const saveRefreshToken = async (
  refreshTokenData: Prisma.RefreshTokenCreateArgs["data"]
) => {
  return await db.refreshToken.create({ data: refreshTokenData });
};

export { saveRefreshToken };
