import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import setupServer from "./entry/server.setup";
import { errorHandler, routeNotFound } from "./helpers/error";
import routes from "./routes";
import loggerMiddleware from "./middlewares/logger.middleware";

const app = express();

const TEN_MINUTES = 1000 * 60 * 10;
app.use(
  rateLimit({
    windowMs: TEN_MINUTES,
    max: 150,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);

// routes
app.get("/healthcheck", (req, res, next) => {
  res.status(200).json({ message: "App is working correctly" });
});
app.use("/api/v1", routes);

app.use(errorHandler);
app.use("*", routeNotFound);

setupServer(app);
