import { Role } from "@prisma/client";
import { sign } from "jsonwebtoken";
import config from "../../config/config";
import * as fs from "fs/promises";

const {
  auth: { privateKeyPath, accessTokenExpiresIn, refreshTokenExpiresIn },
} = config;

type TAccessPayload = {
  id: string;
  role: Role;
};

type TRefreshPayload = {
  id: string;
  role: Role;
  ip: string;
};

const getPrivateKey = async () => {
  return await fs.readFile(privateKeyPath, "utf-8");
};

const createAccessToken = async (accessPayload: TAccessPayload) => {
  const privateKey = await getPrivateKey();
  const token = sign(accessPayload, privateKey, {
    expiresIn: accessTokenExpiresIn,
    algorithm: "RS256",
  });

  return token;
};

const createRefreshToken = async (refreshPayload: TRefreshPayload) => {
  const privateKey = await getPrivateKey();
  const token = sign(refreshPayload, privateKey, {
    expiresIn: `${refreshTokenExpiresIn}d`,
    algorithm: "RS256",
  });

  return token;
};

export {
  createAccessToken,
  TAccessPayload,
  createRefreshToken,
  TRefreshPayload,
};
