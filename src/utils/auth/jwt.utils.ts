import { Role } from "@prisma/client";
import { sign } from "jsonwebtoken";
import config from "../../config/config";
import * as fs from "fs/promises";

const {
  auth: {
    privateKeyPath,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
    publicKeyPath,
  },
} = config;

interface IAccessPayload {
  id: string;
  role: Role;
}

interface IRefreshPayload {
  id: string;
  role: Role;
  ip: string;
}

const getPublicKey = async () => {
  return await fs.readFile(publicKeyPath, "utf-8");
};

const getPrivateKey = async () => {
  return await fs.readFile(privateKeyPath, "utf-8");
};

const createAccessToken = async (accessPayload: IAccessPayload) => {
  const privateKey = await getPrivateKey();
  const token = sign(accessPayload, privateKey, {
    expiresIn: accessTokenExpiresIn,
    algorithm: "RS256",
  });

  return token;
};

const createRefreshToken = async (refreshPayload: IRefreshPayload) => {
  const privateKey = await getPrivateKey();
  const token = sign(refreshPayload, privateKey, {
    expiresIn: `${refreshTokenExpiresIn}d`,
    algorithm: "RS256",
  });

  return token;
};

export {
  createAccessToken,
  IAccessPayload,
  createRefreshToken,
  IRefreshPayload,
  getPublicKey,
};
