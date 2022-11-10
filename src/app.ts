import config from "./config/config";
import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import notFound from "./middlewares/notFound.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import CustomException from "./utils/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";

const app: Express = express();
const { port, host, logging } = config;

const initializeMiddleware = () => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan(logging.level));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
};

const start = (port: Number): void => {
  try {
    initializeMiddleware();

    app.use(errorHandler);
    app.use(notFound);

    app.listen(port, () => {
      console.log(`App is listening on ${host}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start(port);
