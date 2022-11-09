import { StatusCodes } from "http-status-codes";
import { Response } from "express";

type CustomResponse<T> =
  | { code: StatusCodes; success: boolean; data: T }
  | { code: StatusCodes; success: boolean; error: string };

type Send<T1 = Response, T2 = any> = (body?: CustomResponse<T2>) => T1;

export interface TypedResponse<T = any> extends Response {
  json: Send<this, T>;
}
