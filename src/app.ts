import express, { Express } from "express";

const app: Express = express();

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
