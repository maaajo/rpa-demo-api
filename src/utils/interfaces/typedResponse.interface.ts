import { StatusCodes } from "http-status-codes";
import { Response } from "express";

type CustomResponse<T> =
  | { code: StatusCodes; result: "SUCCESS"; data: T }
  | { code: StatusCodes; result: "ERROR"; error: string };

type Send<T1 = Response, T2 = any> = (body?: CustomResponse<T2>) => T1;

export interface TypedResponse<T = void> extends Response {
  json: Send<this, T>;
}
