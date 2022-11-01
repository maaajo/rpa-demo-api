import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";

const app: Express = express();

const initializeMiddleware = () => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan("common"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
};

const start = (): void => {
  try {
    app.listen(3000, () => {
      console.log(`App listening on port ${3000}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
