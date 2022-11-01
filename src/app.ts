import { env } from "./env";
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";

const app: Express = express();
const port = env.PORT;

const initializeMiddleware = () => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan("common"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
};

const start = (port: number = 3000): void => {
  try {
    initializeMiddleware();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start(port);
