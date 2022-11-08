import config from "./config/config";
import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";

const app: Express = express();
const port = config.port;

const initializeMiddleware = () => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan(config.logging.level));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
};

const start = (port: Number): void => {
  try {
    initializeMiddleware();

    app.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    });

    app.post("/test", (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    });

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start(port);
