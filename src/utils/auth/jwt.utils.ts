import { Role } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { env } from "../../env";

interface IJwtPayload {
  email: string;
  role: Role;
}

const createJwtToken = (payload: IJwtPayload) => {
  const token = sign(payload, env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

export { createJwtToken, IJwtPayload };
