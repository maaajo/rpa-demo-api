import { Role } from "@prisma/client";
import { sign } from "jsonwebtoken";
import config from "../../config/config";

interface IJwtPayload {
  email: string;
  role: Role;
}

const createJwtToken = (payload: IJwtPayload) => {
  const token = sign(payload, config.auth.accessTokenSecretKey, {
    expiresIn: "1d",
  });

  return token;
};

export { createJwtToken, IJwtPayload };
