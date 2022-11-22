import { JwtPayload } from "jsonwebtoken";
import { IRefreshPayload } from "../../utils/auth/jwt.utils";
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRefreshRequest {
  refreshToken: string;
}

export interface IJwtVerifyRefreshPayload extends JwtPayload, IRefreshPayload {}
