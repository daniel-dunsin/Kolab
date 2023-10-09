import { Application } from "express";
import mongoose from "mongoose";
import settings from "../constants/settings";
import logger from "../helpers/logger";

const setupServer = (app: Application) => {
  mongoose
    .connect(settings.mongodbUrl)
    .then(() => {
      app.listen(settings.port, () => {
        logger.info(`App is listening on port ${settings.port}🔥`);
      });
    })
    .catch((error) => {
      console.log(`Unable to connect to mongoose ${error}❌`);
    });
};

export default setupServer;
