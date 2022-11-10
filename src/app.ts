import config from "./config/config";
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import notFound from "./utils/middlewares/notFound.middleware";
import errorHandler from "./utils/middlewares/errorHandler.middleware";
import apiRoutes from "./routes/routes";

const app: Express = express();
const { port, host, logging, mainApiRoute } = config;

const initializeMiddleware = () => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan(logging.level));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
};

const initializeApiRoutes = () => {
  app.use(mainApiRoute, apiRoutes);
};

const initializeExceptionHandling = () => {
  // have to always comes last, right before app listen
  // order matters in express
  app.use(errorHandler);
  app.use(notFound);
};

const start = (port: Number): void => {
  try {
    initializeMiddleware();

    initializeApiRoutes();

    initializeExceptionHandling();

    app.listen(port, () => {
      console.log(`App is listening on ${host}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start(port);
