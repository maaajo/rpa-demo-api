import { StatusCodes } from "http-status-codes";

class CustomException extends Error {
  public status: StatusCodes;
  public message: string;

  constructor(status: StatusCodes, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default CustomException;
