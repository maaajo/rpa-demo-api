import { Role } from "@prisma/client";
import { sign } from "jsonwebtoken";
import config from "../../config/config";
import * as fs from "fs/promises";

const {
  auth: {
    accessTokenSecretKey,
    accessTokenExpiresIn,
    refreshTokenSecretKey,
    refreshTokenExpiresIn,
  },
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
  console.log(process.cwd());
  return await fs.readFile("./");
};

const createAccessToken = (accessPayload: TAccessPayload) => {
  const token = sign(accessPayload, accessTokenSecretKey, {
    expiresIn: accessTokenExpiresIn,
  });

  return token;
};

const createRefreshToken = (refreshPayload: TRefreshPayload) => {
  const token = sign(refreshPayload, refreshTokenSecretKey, {
    expiresIn: `${refreshTokenExpiresIn}d`,
  });

  return token;
};

export {
  createAccessToken,
  TAccessPayload,
  createRefreshToken,
  TRefreshPayload,
};
