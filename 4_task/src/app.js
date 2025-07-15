import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import pino from "pino-http";
import { config } from "./config/index.js";
import { container } from "./container.js";
import { scopePerRequest } from "awilix-express";
import swaggerUi from "swagger-ui-express";
import { generateSpecs } from "./docs/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { router as brewRouter } from "./routes/brew.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());

  app.use(cors());

  app.use(compression());

  app.post(
    "/api/brews",
    rateLimit({
      windowMs: 60_000,
      max: 10,
      standardHeaders: true, // RateLimit-* для клієнта
      legacyHeaders: false,
    })
  );
  if (config.env === "development") {
    app.use(morgan("dev"));
  } else {
    app.use(pino());
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(scopePerRequest(container));

  app.use("/api", brewRouter);

  if (config.env === "development") {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(generateSpecs()));
    console.log(`Swagger docs → ${config.baseUrl}/docs`);
  }

  app.use(notFound);

  app.use(errorHandler);

  return app;
}
